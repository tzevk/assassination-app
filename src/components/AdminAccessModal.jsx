'use client'
import { useState } from 'react'
import '../styles/modal.css'
import { useRouter } from 'next/navigation'

export default function AdminAccessModal({ isOpen, onClose }) {
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAccess = () => {
    const expectedKey = 'SUVIDYA2025' // ✅ Hardcoded for now, can move to .env later
    if (secretKey === expectedKey) {
      setError('')
      onClose()
      router.push('/admin/login')
    } else {
      setError('Invalid secret key.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Admin Access</h2>
        <input
          type="password"
          placeholder="Enter secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button className="btn confirm" onClick={handleAccess}>Enter</button>
          <button className="btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}