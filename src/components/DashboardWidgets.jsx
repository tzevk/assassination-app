import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function DashboardWidgets({
  widgets,
  iconMap = {},
  onDelete = () => {}
}) {
  return (
    <section className="stats-grid">
      {widgets.map(({ id, title, value, accent, icon, type }) => {
        const IconComponent = iconMap[icon] || null

        return (
          <div
            key={id}
            className={`widget widget--${type}`}
            style={{ '--accent-color': accent }}
          >
            {/* delete button */}
            <button
              className="widget-delete-btn"
              onClick={() => onDelete(id)}
              title="Remove widget"
            >
              <FaTrash size={14} />
            </button>

            {IconComponent && (
              <div className="widget-icon">
                <IconComponent size={48} />
              </div>
            )}
            <div className="widget-content">
              <h2>{value}</h2>
              <p>{title}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}