import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { corsHeaders } from '../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  const { data: slots, error } = await supabase
    .from('slots')
    .select('*')
    .order('start_time')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() })
  }

  if (date) {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('slot_id')
      .eq('date', date)
      .eq('status', 'active')

    const bookedCount: Record<string, number> = {}
    bookings?.forEach(b => {
      bookedCount[b.slot_id] = (bookedCount[b.slot_id] || 0) + 1
    })

    const slotsWithAvailability = slots.map(slot => ({
      ...slot,
      booked: bookedCount[slot.id] || 0,
      available: slot.quota - (bookedCount[slot.id] || 0)
    }))

    return NextResponse.json({ slots: slotsWithAvailability }, { headers: corsHeaders() })
  }

  return NextResponse.json({ slots }, { headers: corsHeaders() })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403, headers: corsHeaders() })
  }

  const body = await request.json()
  const { id, quota } = body

  if (!id || quota === undefined || quota < 1) {
    return NextResponse.json({ error: 'Data tidak valid' }, { status: 400, headers: corsHeaders() })
  }

  const { data, error } = await supabase
    .from('slots')
    .update({ quota })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() })
  }

  return NextResponse.json({ message: 'Kuota berhasil diupdate', slot: data }, { headers: corsHeaders() })
}