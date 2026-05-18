import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server' // Memanggil super admin yang baru kita buat
import { corsHeaders } from '../cors'

// Handler untuk Preflight Request dari browser Frontend (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

// GET /api/slots — ambil semua slot (+ jumlah booking per tanggal)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // format: YYYY-MM-DD

    // Mengambil slot jam lewat jalur HTTPS bebas blokir Wi-Fi
    const { data: slots, error: slotsError } = await supabaseAdmin
      .from('slots')
      .select('*')
      .order('start_time')

    if (slotsError) {
      return NextResponse.json(
        { error: slotsError.message }, 
        { status: 500, headers: corsHeaders() }
      )
    }

    // Jika Frontend mengirim parameter tanggal, hitung sisa kuota yang tersedia
    if (date) {
      const { data: bookings, error: bookingsError } = await supabaseAdmin
        .from('bookings')
        .select('slot_id')
        .eq('date', date)
        .eq('status', 'active')

      if (bookingsError) {
        return NextResponse.json(
          { error: bookingsError.message }, 
          { status: 500, headers: corsHeaders() }
        )
      }

      const bookedCount: Record<string, number> = {}
      bookings?.forEach(b => {
        if (b.slot_id) {
          bookedCount[b.slot_id] = (bookedCount[b.slot_id] || 0) + 1
        }
      })

      const slotsWithAvailability = slots.map(slot => ({
        ...slot,
        booked: bookedCount[slot.id] || 0,
        available: (slot.quota || 0) - (bookedCount[slot.id] || 0)
      }))

      return NextResponse.json({ slots: slotsWithAvailability }, { headers: corsHeaders() })
    }

    return NextResponse.json({ slots }, { headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message }, 
      { status: 500, headers: corsHeaders() }
    )
  }
}

// PATCH /api/slots — update kuota (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // 1. Ambil token akses JWT yang dikirim Frontend lewat header Authorization
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi (Token tidak ditemukan)' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    const token = authHeader.split(' ')[1]

    // 2. Verifikasi token ke Supabase Auth untuk mencaritahu data User ID-nya
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Sesi login tidak valid atau sudah kadaluwarsa' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    // 3. Cek apakah role user tersebut adalah admin di tabel profiles
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Akses ditolak! Anda bukan Admin.' }, 
        { status: 403, headers: corsHeaders() }
      )
    }

    // 4. Jika lolos verifikasi Admin, jalankan perintah update kuota
    const body = await request.json()
    const { id, quota } = body

    if (!id || quota === undefined || quota < 1) {
      return NextResponse.json(
        { error: 'Data tidak valid' }, 
        { status: 400, headers: corsHeaders() }
      )
    }

    const { data, error: updateError } = await supabaseAdmin
      .from('slots')
      .update({ quota })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message }, 
        { status: 500, headers: corsHeaders() }
      )
    }

    return NextResponse.json(
      { message: 'Kuota berhasil diupdate', slot: data }, 
      { headers: corsHeaders() }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message }, 
      { status: 500, headers: corsHeaders() }
    )
  }
}