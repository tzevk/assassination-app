// src/app/api/quizzes/[quizId]/route.js

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'

export async function GET(request, context) {
  // pull params off context
  const { quizId } = context.params

  try {
    const client = await clientPromise
    const db     = client.db('piping_quiz')

    const quiz = await db
      .collection('Question')
      .findOne({ quizId })

    if (!quiz) {
      return NextResponse.json(
        { message: `Quiz "${quizId}" not found.` },
        { status: 404 }
      )
    }

    // only send what the client needs
    const { title, description, totalMarks, questions } = quiz
    return NextResponse.json(
      { quizId, title, description, totalMarks, questions },
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