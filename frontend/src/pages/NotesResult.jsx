import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function NotesResult(){
  const {id} = useParams()
  const [lecture, setLecture] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get('/api/lecture/' + id, {headers:{Authorization:`Bearer ${token}`}})
      .then(r=>{
        setLecture(r.data.lecture)
        setLoading(false)
      })
      .catch(()=>{
        setLoading(false)
      })
  },[id])

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('/api/lecture/export-pdf', {lectureId: id}, {headers:{Authorization:`Bearer ${token}`}})
      const b64 = res.data.pdf_base64
      const blob = await (await fetch('data:application/pdf;base64,'+b64)).blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (lecture.title || 'lecture') + '.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (err) {
      alert('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  if(loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
    </div>
  )

  if(!lecture) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <p className="text-gray-600 dark:text-gray-400 text-lg">Failed to load lecture</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/history" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to History
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{lecture.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">Generated on {new Date(lecture.uploadedAt || lecture.createdAt).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={handleExportPDF}
              disabled={exporting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? '⏳ Exporting...' : '📥 Export PDF'}
            </button>
          </div>
        </div>

        {/* Summary */}
        {lecture.summary && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Summary</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{lecture.summary}</p>
          </div>
        )}

        {/* Keywords */}
        {lecture.keywords && lecture.keywords.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🏷️ Key Topics</h2>
            <div className="flex flex-wrap gap-2">
              {lecture.keywords.map((keyword, idx) => (
                <span key={idx} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Transcript */}
        {lecture.transcript && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📝 Transcript</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg overflow-auto max-h-96">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                {lecture.transcript}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <Link to="/history" className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition">
            ← Back to History
          </Link>
          <Link to="/upload" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
            ➕ Upload Another
          </Link>
        </div>
      </div>
    </div>
  )
}
