// src/app/api/admin/create-quiz/route.js

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'

export async function POST(request) {
  try {
    const { quizId, title, totalMarks, description, questions } = await request.json()

    // Basic validation
    if (!quizId || !title || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { message: 'quizId, title, and at least one question are required.' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('piping_quiz')

    // Check uniqueness
    const exists = await db.collection('Quiz').findOne({ quizId })
    if (exists) {
      return NextResponse.json(
        { message: `Quiz ID "${quizId}" already exists.` },
        { status: 409 }
      )
    }

    // 1️⃣ Insert the quiz meta
    const quizDoc = {
      quizId,
      title,
      totalMarks: Number(totalMarks) || 0,
      description: description || '',
      createdAt: new Date(),
    }
    await db.collection('Quiz').insertOne(quizDoc)

    // 2️⃣ Insert questions separately, each referencing quizId
    const questionDocs = questions.map((q, i) => ({
      quizId,
      index: i,                     // question order
      question: q.question,
      options: q.options,
      correctAnswerIndex: q.correctAnswerIndex,
      createdAt: new Date(),
    }))
    await db.collection('Question').insertMany(questionDocs)

    return NextResponse.json(
      { success: true, quizId },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating quiz:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}