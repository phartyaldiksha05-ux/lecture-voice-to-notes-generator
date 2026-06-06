import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpTrayIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function Dashboard(){
  const [recentLectures, setRecentLectures] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/lecture/all', { headers: { 'Authorization': `Bearer ${token}` } })
        setRecentLectures(res.data.lectures?.slice(0, 3) || [])
      } catch (err) {
        console.log('Failed to fetch lectures')
      } finally {
        setLoading(false)
      }
    }
    fetchLectures()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Manage your lectures and notes</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link to="/upload" className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <ArrowUpTrayIcon className="w-12 h-12 group-hover:scale-110 transition" />
              <div>
                <h2 className="text-2xl font-bold">Upload Lecture</h2>
                <p className="text-blue-100">Create notes from audio</p>
              </div>
            </div>
          </Link>

          <Link to="/history" className="group bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <DocumentTextIcon className="w-12 h-12 group-hover:scale-110 transition" />
              <div>
                <h2 className="text-2xl font-bold">View History</h2>
                <p className="text-indigo-100">All your lectures</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Lectures */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Lectures</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          ) : recentLectures.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No lectures yet. Start by uploading one!</p>
              <Link to="/upload" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Upload First Lecture
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recentLectures.map(lecture => (
                <div key={lecture._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{lecture.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <ClockIcon className="w-4 h-4" />
                    {new Date(lecture.uploadedAt).toLocaleDateString()}
                  </div>
                  <Link to={`/notes/${lecture._id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Notes →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Lectures</p>
            <p className="text-3xl font-bold text-blue-600">{recentLectures.length}+</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Time Saved</p>
            <p className="text-3xl font-bold text-green-600">⚡ 8+ hrs</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">AI Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">✨ 99%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
