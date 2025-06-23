// src/app/api/quizzes/route.js

import { NextResponse } from 'next/server'
import clientPromise    from '@/lib/mongo'

export async function GET() {
  const client = await clientPromise
    const db = client.db('piping_quiz')
    const raw = await db
    .collection('Question')
    .find({}, { projection: { quizId:1, title:1, totalMarks:1, questions:1 } })
    .toArray()

  const quizzes = raw.map(q => ({
    quizId: q.quizId,
    title: q.title,
    totalMarks: q.totalMarks,
    questions: q.questions
  }))
  return NextResponse.json(quizzes)
}