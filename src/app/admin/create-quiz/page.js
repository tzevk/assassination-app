// src/app/admin/create-quiz/page.js
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader  from '@/components/AdminHeader'
import QuestionPreviewModal from '@/components/QuestionPreviewModal'

import '@/styles/create-quiz.css'
import '@/styles/QuestionPreviewModal.css'

export default function CreateQuizPage() {
  const router = useRouter()

  // Quiz metadata including simple string ID
  const [quizInfo, setQuizInfo] = useState({
    quizId: '',
    title: '',
    totalMarks: 50,
    description: ''
  })

  // Manual questions array
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ])

  // Preview modal state
  const [showPreview, setShowPreview] = useState(false)

  // Update quizInfo fields
  const handleQuizChange = e => {
    const { name, value } = e.target
    setQuizInfo(prev => ({ ...prev, [name]: value }))
  }

  // Handlers for manual question edits
  const updateQuestion = (qIdx, field, val) => {
    const copy = [...questions]
    copy[qIdx][field] = val
    setQuestions(copy)
  }
  const updateOption = (qIdx, optIdx, val) => {
    const copy = [...questions]
    copy[qIdx].options[optIdx] = val
    setQuestions(copy)
  }
  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
    ])
  }
  const removeQuestion = qIdx => {
    setQuestions(prev => prev.filter((_, i) => i !== qIdx))
  }
  const setCorrect = (qIdx, optIdx) => {
    const copy = [...questions]
    copy[qIdx].correctAnswerIndex = optIdx
    setQuestions(copy)
  }

  // Preview logic
  const handlePreview = () => {
    // basic validation before preview
    if (!quizInfo.quizId.trim() || !quizInfo.title.trim()) {
      alert('Quiz ID and title are required.')
      return
    }
    if (questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) {
      alert('Please fill in all questions and options.')
      return
    }
    setShowPreview(true)
  }
  const confirmPreview = () => {
    setShowPreview(false)
  }

  // Submit to API
  const handleSubmit = async () => {
    const payload = { ...quizInfo, questions }
    const res = await fetch('/api/admin/create-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      alert('✅ Quiz created!')
      router.push('/admin/dashboard')
    } else {
      const { message } = await res.json()
      alert('❌ ' + (message || 'Error saving quiz.'))
    }
  }

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-content">

        <div className="page-header">
          <h1>Create New Quiz</h1>
        </div>

        <div className="quiz-form-container">
          <div className="quiz-form">

            {/* Quiz Metadata */}
            <div className="card">
              <h2>Quiz Details</h2>
              <label>
                Quiz ID
                <input
                  type="text"
                  name="quizId"
                  value={quizInfo.quizId}
                  onChange={handleQuizChange}
                  placeholder="e.g. MATH101"
                />
              </label>
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={quizInfo.title}
                  onChange={handleQuizChange}
                  placeholder="Quiz title"
                />
              </label>
              <label>
                Total Marks
                <select
                  name="totalMarks"
                  value={quizInfo.totalMarks}
                  onChange={handleQuizChange}
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
              <label>
                Description
                <textarea
                  name="description"
                  rows={2}
                  value={quizInfo.description}
                  onChange={handleQuizChange}
                  placeholder="Short description"
                />
              </label>
            </div>

            {/* Manual Questions */}
            {questions.map((q, qi) => (
              <div className="question-card" key={qi}>
                <div className="question-header">
                  <h3>Question {qi + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      className="remove-q-btn"
                      onClick={() => removeQuestion(qi)}
                    >
                      &times;
                    </button>
                  )}
                </div>
                <textarea
                  className="question-input"
                  placeholder="Enter question text"
                  value={q.question}
                  onChange={e => updateQuestion(qi, 'question', e.target.value)}
                />
                <div className="options">
                  {q.options.map((opt, oi) => (
                    <label className="option-item" key={oi}>
                      <input
                        type="radio"
                        name={`correct-${qi}`}
                        checked={q.correctAnswerIndex === oi}
                        onChange={() => setCorrect(qi, oi)}
                      />
                      <input
                        type="text"
                        className="option-input"
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={e => updateOption(qi, oi, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-question-btn"
              onClick={addQuestion}
            >
              + Add Question
            </button>

            {/* Preview & Save Buttons */}
            <div className="action-buttons">
              <button
                type="button"
                className="btn-preview"
                onClick={handlePreview}
              >
                Preview Questions
              </button>
              <button
                className="btn-submit-full"
                onClick={handleSubmit}
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <QuestionPreviewModal
            questions={questions}
            onConfirm={confirmPreview}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  )
}
