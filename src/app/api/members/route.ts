import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { corsHeaders } from '../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }
    const token = authHeader.split(' ')[1]

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403, headers: corsHeaders() })
    }

    // Mengambil semua data profiles dengan role member
    const { data: members, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('role', 'member')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json({ members }, { headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() })
  }
}