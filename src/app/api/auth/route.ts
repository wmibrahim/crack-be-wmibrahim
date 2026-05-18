import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { corsHeaders } from '../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()
  const { action, email, password, full_name, phone } = body

  if (action === 'register') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name, phone, role: 'member' }
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400, headers: corsHeaders() })
    }

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user: data.user
    }, { status: 201, headers: corsHeaders() })
  }

  if (action === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401, headers: corsHeaders() })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    return NextResponse.json({
      message: 'Login berhasil',
      user: data.user,
      role: profile?.role,
      session: data.session
    }, { headers: corsHeaders() })
  }

  if (action === 'logout') {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400, headers: corsHeaders() })
    }

    return NextResponse.json({ message: 'Logout berhasil' }, { headers: corsHeaders() })
  }

  return NextResponse.json({ error: 'Action tidak valid' }, { status: 400, headers: corsHeaders() })
}

export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return NextResponse.json({ user, profile }, { headers: corsHeaders() })
}