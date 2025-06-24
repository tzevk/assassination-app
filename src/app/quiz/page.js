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
        // Ensure every quiz has a questions array
        const safe = data.map(q => ({
          ...q,
          questions: Array.isArray(q.questions) ? q.questions : []
        }))
        setQuizzes(safe)
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

  return (
    <div className="quiz-dashboard">
      <h1>Available Quizzes</h1>

      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <div className="quiz-grid">
          {quizzes.map(quiz => {
            // key MUST be on this <div>, the very first element of the map
            return (
              <div
                key={quiz.quizId}
                className="quiz-card"
                onClick={() => router.push(`/quiz/${quiz.quizId}`)}
              >
                <h2>{quiz.title}</h2>
                <p>{quiz.questions.length} Questions</p>
                <p>Total Marks: {quiz.totalMarks}</p>
                <button className="start-btn">Start Quiz</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}