// src/app/api/quizzes/[quizId]/route.js

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'   // your MongoClient promise

export async function GET(request, context) {
  const { quizId } = context.params

  try {
    const client = await clientPromise
    const db = client.db('piping_quiz')

    // 1️⃣ Load quiz metadata
    const quizMeta = await db
      .collection('Quiz')
      .findOne(
        { quizId },
        { projection: { _id: 0, quizId: 1, title: 1, description: 1, totalMarks: 1 } }
      )

    if (!quizMeta) {
      return NextResponse.json(
        { message: `Quiz "${quizId}" not found.` },
        { status: 404 }
      )
    }

    // 2️⃣ Load its questions
    const questionDocs = await db
      .collection('Question')
      .find({ quizId })
      .sort({ index: 1 })
      .project({ _id: 0, quizId: 0, index: 0 })
      .toArray()

    // 3️⃣ Return combined payload
    return NextResponse.json(
      {
        ...quizMeta,
        questions: questionDocs
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error fetching quiz:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}