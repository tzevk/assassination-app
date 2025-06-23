// src/app/api/users/route.js
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'   // your MongoClient promise

export async function POST(request) {
  try {
    const data = await request.json()
    const { username, batchId, rollNumber, stream, email, phone } = data

    // basic validation
    if (!username || !batchId || !rollNumber || !stream || !email || !phone) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('piping_quiz')

    // ensure no duplicate rollNumber in same batch
    const exists = await db
      .collection('User')
      .findOne({ batchId, rollNumber })

    if (exists) {
      return NextResponse.json(
        { message: 'User with that batch+roll already exists.' },
        { status: 409 }
      )
    }

    const result = await db
      .collection('User')
      .insertOne({
        username,
        batchId,
        rollNumber,
        stream,
        email,
        phone,
        createdAt: new Date(),
      })

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    )
  } catch (err) {
    console.error('User creation error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}