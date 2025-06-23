/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import '../styles/home.css'
import AdminAccessModal from '../components/AdminAccessModal'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="landing-container">
      <div className="card">
        <img src="/logo.png" alt="Suvidya Institute Logo" className="logo" />
        <h1 className="title">Assessment Portal</h1>
        <p className="subtitle">
          
        </p>
        <div className="button-group">
          <button className="button" onClick={() => setModalOpen(true)}>Go to Admin Panel</button>
          <a href="/user/login"><button className="button">Start Student Quiz</button></a>
        </div>
      </div>

      <AdminAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}