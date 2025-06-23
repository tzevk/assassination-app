'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import '@/styles/quiz-attempt.css'

export default function QuizAttemptPage() {
  const { quizId } = useParams()
  const router     = useRouter()
  const [quiz, setQuiz]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore]     = useState(0)

  useEffect(() => {
    fetch(`/api/quizzes/${quizId}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setQuiz(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [quizId])

  if (loading) return <p>Loading quiz…</p>
  if (!quiz)    return <p>Quiz “{quizId}” not found.</p>

  const handleSelect = (i, j) =>
    setAnswers(a => ({ ...a, [i]: j }))

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      alert('Answer all questions first.')
      return
    }
    const correct = quiz.questions.reduce(
      (sum, q, i) => sum + (answers[i] === q.correctAnswerIndex ? 1 : 0),
      0
    )
    setScore(correct)
    setSubmitted(true)
  }

  return (
    <div className="quiz-attempt">
      <header className="qa-header">
        <h1>{quiz.title}</h1>
        <p>{quiz.questions.length} Q • Total Marks: {quiz.totalMarks}</p>
      </header>

      <ol className="qa-questions">
        {quiz.questions.map((q, i) => (
          <li key={i} className="qa-question">
            <p className="qa-qtext">{q.question}</p>
            <div className="qa-options">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={[
                    'qa-option',
                    submitted
                      ? j === q.correctAnswerIndex
                        ? 'correct'
                        : answers[i] === j
                          ? 'incorrect'
                          : ''
                      : ''
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    checked={answers[i] === j}
                    disabled={submitted}
                    onChange={() => handleSelect(i, j)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="qa-actions">
        {!submitted ? (
          <button className="qa-submit-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        ) : (
          <div className="qa-result">
            <p>
              You scored <strong>{score}</strong> out of{' '}
              <strong>{quiz.questions.length}</strong>.
            </p>
            <button onClick={() => router.push('/quiz')}>Back to List</button>
          </div>
        )}
      </div>
    </div>
  )
}