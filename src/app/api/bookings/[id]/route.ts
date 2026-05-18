import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { corsHeaders } from '../../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*, slots(start_time)')
    .eq('id', id)
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking tidak ditemukan' }, { status: 404, headers: corsHeaders() })
  }

  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Booking sudah dibatalkan' }, { status: 400, headers: corsHeaders() })
  }

  if (profile?.role !== 'admin') {
    if (booking.user_id !== user.id) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403, headers: corsHeaders() })
    }

    const [hours, minutes] = booking.slots.start_time.split(':').map(Number)
    const sessionStart = new Date(`${booking.date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`)
    const oneHourBefore = new Date(sessionStart.getTime() - 60 * 60 * 1000)

    if (new Date() >= oneHourBefore) {
      return NextResponse.json({
        error: `Tidak bisa cancel. Batas cancel adalah 1 jam sebelum sesi dimulai (sebelum ${oneHourBefore.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })})`
      }, { status: 400, headers: corsHeaders() })
    }
  }

  const { data: updated, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() })
  }

  return NextResponse.json({ message: 'Booking berhasil dibatalkan', booking: updated }, { headers: corsHeaders() })
}