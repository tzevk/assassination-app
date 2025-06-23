'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/login.css'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    batchId: '',
    rollNumber: '',
    stream: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // basic validation
    const { username, batchId, rollNumber, stream, email, phone } = formData
    if (!username || !batchId || !rollNumber || !stream || !email || !phone) {
      setError('Please fill in all fields.')
      return
    }
      try {
            const res = await fetch('/api/users/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            })
        
            const data = await res.json()
            if (res.ok) {
              router.push('/quiz')
            } else {
              setError(data.message || 'Failed to create user.')
            }
          } catch (err) {
            console.error('Login error:', err)
            setError('Network error.')
          }
          
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>
        {error && <p className="error">{error}</p>}

        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Batch ID
          <input
            type="text"
            name="batchId"
            value={formData.batchId}
            onChange={handleChange}
            placeholder="e.g. BATCH2025"
          />
        </label>

        <label>
          Roll Number
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="e.g. 12345"
          />
        </label>

        <label>
          Stream
          <input
            type="text"
            name="stream"
            value={formData.stream}
            onChange={handleChange}
            placeholder="e.g. ECE"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit number"
          />
        </label>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  )
}
