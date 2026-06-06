import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DocumentTextIcon, CalendarIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function History(){
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get('/api/lecture/all', {headers:{Authorization:`Bearer ${token}`}})
      .then(r=>{
        setList(r.data.lectures || [])
        setLoading(false)
      })
      .catch(()=>{
        setLoading(false)
      })
  },[])

  const handleDelete = async (lectureId) => {
    if(!window.confirm('Delete this lecture?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/lecture/${lectureId}`, {headers:{Authorization:`Bearer ${token}`}})
      setList(list.filter(l => l._id !== lectureId))
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Lecture History</h1>
          <p className="text-gray-600 dark:text-gray-400">All your uploaded lectures and generated notes</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="p-12 text-center">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No lectures yet</p>
              <Link to="/upload" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Upload Your First Lecture
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {list.map(lecture => (
                <div key={lecture._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lecture.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(lecture.uploadedAt || lecture.createdAt).toLocaleDateString()}
                        </div>
                        {lecture.transcript && (
                          <div className="flex items-center gap-1 text-green-600">
                            ✓ Transcribed
                          </div>
                        )}
                        {lecture.notes && (
                          <div className="flex items-center gap-1 text-blue-600">
                            ✓ Notes Generated
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                        to={`/notes/${lecture._id}`} 
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition"
                      >
                        View Notes
                      </Link>
                      <button
                        onClick={() => handleDelete(lecture._id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
