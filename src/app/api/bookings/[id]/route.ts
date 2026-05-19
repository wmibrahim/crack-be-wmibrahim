import { createClient, supabaseAdmin } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { corsHeaders } from '../../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Autentikasi
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Token tidak disertakan' }, { status: 401, headers: corsHeaders() })
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
  }

  // 2. Ambil Profil (Gunakan supabaseAdmin untuk bypass RLS)
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  // 3. Ambil data Booking
  const { data: booking, error: bookingError } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (bookingError) return NextResponse.json({ error: bookingError.message }, { status: 500, headers: corsHeaders() })
  if (!booking) return NextResponse.json({ error: 'Booking tidak ditemukan' }, { status: 404, headers: corsHeaders() })

  // 4. Ambil data Slot
  const { data: slot, error: slotError } = await supabaseAdmin
    .from('slots')
    .select('start_time')
    .eq('id', booking.slot_id)
    .maybeSingle()

  if (slotError || !slot) return NextResponse.json({ error: 'Data slot tidak ditemukan' }, { status: 404, headers: corsHeaders() })

  // 5. Logika Akses (Admin atau Pemilik)
  const isAdmin = profile?.role?.toString().toLowerCase().trim() === 'admin';
  const isOwner = booking.user_id === user.id;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403, headers: corsHeaders() })
  }

  // 6. Validasi Status
  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Booking sudah dibatalkan' }, { status: 400, headers: corsHeaders() })
  }

  // 7. Validasi waktu untuk Member (Bukan Admin)
  if (!isAdmin) {
    const [hours, minutes] = slot.start_time.split(':').map(Number);
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(hours, minutes, 0, 0);

    const now = new Date();
    // Tambahkan buffer 1 jam
    const oneHourBefore = new Date(bookingDate.getTime() - 60 * 60 * 1000);

    if (now >= oneHourBefore) {
      return NextResponse.json({ 
        error: 'Tidak bisa membatalkan karena sesi akan dimulai dalam kurang dari 1 jam.' 
      }, { status: 400, headers: corsHeaders() })
    }
  }

  // 8. Update Status
  const { data: updated, error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500, headers: corsHeaders() })
  }

  return NextResponse.json({ message: 'Booking berhasil dibatalkan', booking: updated }, { headers: corsHeaders() })
}