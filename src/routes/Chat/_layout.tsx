// src/routes/Chat.tsx - Main layout route (NOT _layout.tsx)
import { useAuth } from '@/lib/context/AuthContext'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { LogOut, MessageCircle } from 'lucide-react'

export const Route = createFileRoute('/Chat/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle size={20} className="text-blue-500" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Chat Assistant
              </h1>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
