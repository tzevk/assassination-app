'use client'

import React from 'react'
import ReactDOM from 'react-dom'
import { FaTimes, FaCheck } from 'react-icons/fa'
import '@/styles/QuestionPreviewModal.css'

export default function QuestionPreviewModal({ questions, onConfirm, onClose }) {
  if (!questions.length) return null

  return ReactDOM.createPortal(
    <div className="qpm-overlay" onClick={onClose}>
      <div className="qpm-modal" onClick={e => e.stopPropagation()}>
        <header className="qpm-header">
          <h2>Preview Questions</h2>
          <button className="qpm-close" onClick={onClose}><FaTimes /></button>
        </header>
        <div className="qpm-body">
          {questions.map((q, i) => (
            <div className="qpm-question" key={i}>
              <p className="qpm-qtext">
                <strong>{i + 1}. </strong>{q.question}
              </p>
              <ul className="qpm-options">
                {q.options.map((opt, j) => (
                  <li key={j} className={j === q.correctAnswerIndex ? 'correct' : ''}>
                    <span className="qpm-opt-label">{String.fromCharCode(65 + j)}.</span> {opt}
                    {j === q.correctAnswerIndex && <FaCheck className="qpm-check" />}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <footer className="qpm-footer">
          <button className="qpm-confirm-btn" onClick={onConfirm}>Confirm</button>
          <button className="qpm-cancel-btn" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>,
    document.body
  )
}