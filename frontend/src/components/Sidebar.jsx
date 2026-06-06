import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, ArrowUpTrayIcon, ClockIcon, LogOutIcon } from '@heroicons/react/24/outline'

export default function Sidebar(){
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-indigo-900 text-white h-screen p-6 shadow-xl flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">🎓 LectureNotes</h1>
        <p className="text-sm text-blue-200">AI-Powered Notes Generator</p>
      </div>
      
      <nav className="flex-1 flex flex-col gap-3">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('/dashboard') ? 'bg-blue-500 shadow-lg' : 'hover:bg-blue-800'}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        
        <Link 
          to="/upload" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('/upload') ? 'bg-blue-500 shadow-lg' : 'hover:bg-blue-800'}`}
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          <span className="font-medium">Upload</span>
        </Link>
        
        <Link 
          to="/history" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('/history') ? 'bg-blue-500 shadow-lg' : 'hover:bg-blue-800'}`}
        >
          <ClockIcon className="w-5 h-5" />
          <span className="font-medium">History</span>
        </Link>
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium w-full"
      >
        <LogOutIcon className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}
