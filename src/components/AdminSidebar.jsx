'use client'
import { useRouter, usePathname } from 'next/navigation'
import '../styles/sidebar.css'    // <-- new import
import { LayoutDashboard, FilePlus, BarChart2 } from 'lucide-react'

export default function AdminSidebar() {
  const router   = useRouter()
  const path     = usePathname()

  const items = [
    { label: 'Dashboard',   icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Create Quiz', icon: FilePlus,        href: '/admin/create-quiz' },
    { label: 'View Results',icon: BarChart2,       href: '/admin/results' },
  ]

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {items.map(({ label, icon: Icon, href }) => {
            const isActive = path === href
            return (
              <li
                key={href}
                className={isActive ? 'active' : ''}
                onClick={() => router.push(href)}
              >
                <Icon size={18} />
                {/* hide text when collapsed? */}
                <span className="label">{label}</span>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}