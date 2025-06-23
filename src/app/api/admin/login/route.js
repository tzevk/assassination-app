import clientPromise from '@/lib/mongo'

export async function POST(req) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('piping_quiz')
    const admins = db.collection('Admin')

    const admin = await admins.findOne({ username })

    if (!admin || admin.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
    }

    return new Response(JSON.stringify({ message: 'Login successful', admin: { username: admin.username } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Login error:', err)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}