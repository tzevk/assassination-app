// src/app/quiz/page.js
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/quiz-dashboard.css'

export default function QuizDashboard() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/quizzes')
      .then(res => res.json())
      .then(data => {
        // Ensure questions is an array
        const sanitized = data.map(q => ({
          ...q,
          questions: Array.isArray(q.questions) ? q.questions : []
        }))
        setQuizzes(sanitized)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load quizzes:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="loading">Loading quizzes…</p>
  }

  if (quizzes.length === 0) {
    return <p className="loading">No quizzes available at the moment.</p>
  }

  return (
    <div className="quiz-dashboard">
      <h1>Available Quizzes</h1>
      <div className="quiz-grid">
        {quizzes.map((quiz) => {
          return (
            <div
              key={quiz.quizId}                // ← must be here, on this div
              className="quiz-card"
              onClick={() => router.push(`/quiz/${quiz.quizId}`)}
            >
              <h2>{quiz.title}</h2>
              <p>{quiz.questions.length} Questions</p>
              <p>Total Marks: {quiz.totalMarks}</p>
              <small>Code: {quiz.quizId}</small>
              <button className="start-btn">Start Quiz</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}