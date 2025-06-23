'use client'

import React, { useState } from 'react'
import ReactDOM           from 'react-dom'

const WIDGET_TYPES = [
  { value: 'stat',  label: 'Statistic' },
  { value: 'trend', label: 'Trend Chart' },
  { value: 'table', label: 'Data Table' },
]

const ICON_OPTIONS = [
  { value: 'FaChartBar', label: 'Bar Chart' },
  { value: 'FaUsers',    label: 'Users' },
  { value: 'FaClock',    label: 'Clock' },
]

export default function AddWidgetModal({ isOpen, onClose, onSubmit }) {
  const [title,  setTitle]   = useState('')
  const [value,  setValue]   = useState('')
  const [type,   setType]    = useState(WIDGET_TYPES[0].value)
  const [accent, setAccent]  = useState('#3C2A99')
  const [icon,   setIcon]    = useState(ICON_OPTIONS[0].value)

  if (!isOpen) return null

  const handleAdd = () => {
    onSubmit({ title, value, type, accent, icon })
    // reset form
    setTitle(''); setValue('')
    setType(WIDGET_TYPES[0].value)
    setAccent('#3C2A99'); setIcon(ICON_OPTIONS[0].value)
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Add New Widget</h3>

        <div className="modal-body">
          <label>
            Title
            <input
              type="text"
              placeholder="E.g. Average Score"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>

          <label>
            Value
            <input
              type="text"
              placeholder="E.g. 85%"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </label>

          <label>
            Type
            <select value={type} onChange={e => setType(e.target.value)}>
              {WIDGET_TYPES.map(w => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </select>
          </label>

          <label>
            Accent Color
            <div className="color-picker-wrap">
              <input
                type="color"
                value={accent}
                onChange={e => setAccent(e.target.value)}
              />
              <div
                className="color-swatch"
                style={{ backgroundColor: accent }}
                title={accent}
              />
            </div>
          </label>

          <label>
            Icon
            <select value={icon} onChange={e => setIcon(e.target.value)}>
              {ICON_OPTIONS.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-submit"
            onClick={handleAdd}
            disabled={!title || !value}
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}