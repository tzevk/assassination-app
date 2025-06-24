// src/app/admin/results/page.js
'use client'

import React, { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader  from '@/components/AdminHeader'
import '@/styles/view-results.css'

export default function ViewResultsPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    fetch('/api/admin/results')
      .then(res => {
        if (!res.ok) throw new Error('Network error')
        return res.json()
      })
      .then(data => {
        setResults(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load results.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-content">

        <div className="vr-container">
          <h1>Student Quiz Results</h1>

          {loading ? (
            <p className="vr-loading">Loading results…</p>
          ) : error ? (
            <p className="vr-error">{error}</p>
          ) : results.length === 0 ? (
            <p>No results available yet.</p>
          ) : (
            <table className="vr-table">
              <thead>
                <tr>
                  <th>Quiz ID</th>
                  <th>Student</th>
                  <th>Batch</th>
                  <th>Roll No.</th>
                  <th>Score</th>
                  <th>Total</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={`${r.quizId}-${r.student.rollNumber}-${idx}`}>
                    <td>{r.quizId}</td>
                    <td>{r.student.username}</td>
                    <td>{r.student.batchId}</td>
                    <td>{r.student.rollNumber}</td>
                    <td>{r.score}</td>
                    <td>{r.totalMarks}</td>
                    <td>{new Date(r.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}