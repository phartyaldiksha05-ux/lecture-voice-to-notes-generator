import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadLecture from './pages/UploadLecture'
import Processing from './pages/Processing'
import NotesResult from './pages/NotesResult'
import History from './pages/History'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/upload' element={<UploadLecture/>} />
        <Route path='/processing/:id' element={<Processing/>} />
        <Route path='/notes/:id' element={<NotesResult/>} />
        <Route path='/history' element={<History/>} />
      </Routes>
    </div>
  )
}
