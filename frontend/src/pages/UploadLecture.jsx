import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function UploadLecture(){
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async e=>{
    e.preventDefault()
    if(!file) {
      setError('Please select an audio file')
      return
    }
    if(!title.trim()) {
      setError('Please enter a lecture title')
      return
    }
    
    setError('')
    setLoading(true)
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title)
    try{
      const res = await axios.post('/api/lecture/upload', fd, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      navigate('/processing/' + res.data.lecture._id)
    }catch(err){
      setError(err.response?.data?.error || 'Upload failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Your Lecture</h1>
            <p className="text-gray-600 dark:text-gray-400">Upload an audio file and we'll generate notes automatically</p>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Lecture Title</label>
              <input 
                type="text"
                required
                placeholder="e.g., Introduction to Quantum Physics"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Audio File</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept=".mp3,.wav,.m4a,.mp4,.ogg,.flac"
                  required
                  className="hidden" 
                  id="file-input"
                  onChange={e=>setFile(e.target.files[0])} 
                />
                <label htmlFor="file-input" className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="text-center">
                    <ArrowUpTrayIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {file ? file.name : 'Click to select or drag file here'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">MP3, WAV, M4A, MP4, OGG, FLAC</p>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Processing...' : '🚀 Upload & Generate Notes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
