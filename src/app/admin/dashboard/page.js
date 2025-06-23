'use client'

import React, { useState } from 'react'
import AdminSidebar     from '@/components/AdminSidebar'
import AdminHeader      from '@/components/AdminHeader'
import DashboardWidgets from '@/components/DashboardWidgets'
import AddWidgetModal   from '@/components/AddWidgetModal'
import { FaChartBar, FaUsers, FaClock } from 'react-icons/fa'

import '../../../styles/dashboard.css'
import '../../../styles/DashboardWidgets.css'
import '../../../styles/AddWidgetModal.css'

const ICON_MAP = {
  FaChartBar: FaChartBar,
  FaUsers:    FaUsers,
  FaClock:    FaClock,
}

export default function AdminDashboardPage() {
  const [widgets, setWidgets] = useState([
    { id: 1, title: 'Total Quizzes',  value: 14,  type:'stat', accent:'#3C2A99', icon:'FaChartBar' },
    { id: 2, title: 'Total Students', value:128,  type:'stat', accent:'#195E8F', icon:'FaUsers'    },
    { id: 3, title: 'Pending Results',value: 6,   type:'stat', accent:'#FAE452', icon:'FaClock'    },
  ])
  const [modalOpen, setModalOpen] = useState(false)

  const handleAdd = widget => {
    setWidgets(w => [...w, { ...widget, id: Date.now() }])
    setModalOpen(false)
  }

  const handleDelete = id => {
    setWidgets(w => w.filter(widget => widget.id !== id))
  }

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-content">
        <AdminHeader />

        <div className="dashboard-tools">
          <button className="add-widget-btn" onClick={() => setModalOpen(true)}>
            + Add Widget
          </button>
        </div>

        <DashboardWidgets
          widgets={widgets}
          iconMap={ICON_MAP}
          onDelete={handleDelete}
        />

        <AddWidgetModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  )
}