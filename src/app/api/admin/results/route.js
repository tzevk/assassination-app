import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('piping_quiz')

    // Fetch all result documents
    const raw = await db
      .collection('Results')
      .find({}, {
        projection: {
          _id: 0,
          quizId: 1,
          'student.username': 1,
          'student.batchId': 1,
          'student.rollNumber': 1,
          score: 1,
          totalMarks: 1,
          submittedAt: 1
        }
      })
      .sort({ submittedAt: -1 })
      .toArray()

    return NextResponse.json(raw)
  } catch (err) {
    console.error('Error fetching results:', err)
    return NextResponse.json(
      { message: 'Failed to load results' },
      { status: 500 }
    )
  }
}