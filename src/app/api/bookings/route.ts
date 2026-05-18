import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server' // Memakai super admin master key
import { corsHeaders } from '../cors'

// Handler untuk Preflight Request dari browser Frontend (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

// GET /api/bookings — ambil riwayat booking (Admin melihat semua, Member melihat milik sendiri)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    // 1. Ambil token JWT dari Header Authorization
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }
    const token = authHeader.split(' ')[1]

    // 2. Cari tahu identitas User ID lewat token tersebut
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }

    // 3. Tarik role user dari tabel profiles
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // 4. Bangun query relasional data booking RevoGym
    let query = supabaseAdmin
      .from('bookings')
      .select(`
        *,
        profiles (id, full_name, phone),
        slots (id, start_time, end_time, quota)
      `)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })

    // Jika bukan admin, kunci filter agar user hanya bisa menarik data miliknya sendiri
    if (profile?.role !== 'admin') {
      query = query.eq('user_id', user.id)
    }

    // Filter tambahan jika ada parameter filter tanggal khusus dari dashboard
    if (date) {
      query = query.eq('date', date)
    }

    const { data: bookings, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json({ bookings }, { headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() })
  }
}

// POST /api/bookings — Membuat booking slot gym baru (Member Only)
export async function POST(request: NextRequest) {
  try {
    // 1. Validasi token JWT dari Frontend
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }
    const token = authHeader.split(' ')[1]

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }

    // 2. Cek hak akses role profile user
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'member') {
      return NextResponse.json({ error: 'Hanya member yang bisa booking' }, { status: 403, headers: corsHeaders() })
    }

    // 3. Periksa kelengkapan data payload input body
    const body = await request.json()
    const { slot_id, date } = body

    if (!slot_id || !date) {
      return NextResponse.json({ error: 'slot_id dan date wajib diisi' }, { status: 400, headers: corsHeaders() })
    }

    // 4. Validasi tanggal agar tidak melompat ke masa lalu
    const today = new Date().toISOString().split('T')[0]
    if (date < today) {
      return NextResponse.json({ error: 'Tidak bisa booking di tanggal yang sudah lewat' }, { status: 400, headers: corsHeaders() })
    }

    // 5. Cek duplikasi: pastikan tidak ada booking aktif di slot & tanggal yang sama untuk user ini
    const { data: existingBooking } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('user_id', user.id)
      .eq('slot_id', slot_id)
      .eq('date', date)
      .eq('status', 'active')
      .maybeSingle() // Menggunakan maybeSingle agar tidak memicu error crash jika data kosong

    if (existingBooking) {
      return NextResponse.json({ error: 'Kamu sudah punya booking aktif di slot ini' }, { status: 409, headers: corsHeaders() })
    }

    // 6. Jalankan fungsi database RPC Supabase untuk mengunci validasi sisa kuota slot gym
    const { data: isAvailable, error: quotaError } = await supabaseAdmin
      .rpc('check_slot_quota', { p_slot_id: slot_id, p_date: date })

    if (quotaError) {
      return NextResponse.json({ error: quotaError.message }, { status: 500, headers: corsHeaders() })
    }

    if (!isAvailable) {
      return NextResponse.json({ error: 'Slot sudah penuh' }, { status: 409, headers: corsHeaders() })
    }

    // 7. Jika seluruh pengecekan lolos, rekam data booking baru ke Supabase
    const { data: booking, error: insertError } = await supabaseAdmin
      .from('bookings')
      .insert({ user_id: user.id, slot_id, date, status: 'active' })
      .select(`*, slots (id, start_time, end_time)`)
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json({ message: 'Booking berhasil', booking }, { status: 201, headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() })
  }
}