import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { corsHeaders } from '../cors'

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, full_name, phone } = body

    if (action === 'register') {
      const { data, error } = await supabaseAdmin.auth.signUp({
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
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401, headers: corsHeaders() })
      }

      // Tarik role dari tabel profiles menggunakan jalur admin
      const { data: profile } = await supabaseAdmin
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
      // Pada stateless backend API, logout cukup ditangani di sisi Frontend dengan menghapus token.
      // Namun kita tetap kembalikan response sukses agar frontend tidak error.
      return NextResponse.json({ message: 'Logout berhasil' }, { headers: corsHeaders() })
    }

    return NextResponse.json({ error: 'Action tidak valid' }, { status: 400, headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }
    const token = authHeader.split(' ')[1]

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401, headers: corsHeaders() })
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({ user, profile }, { headers: corsHeaders() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() })
  }
}