import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Processing(){
  const {id} = useParams()
  const [status, setStatus] = useState('Processing your lecture...')
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const run = async ()=>{
      try{
        setProgress(25)
        await axios.post('/api/lecture/transcribe', {lectureId: id}, {headers:{Authorization:`Bearer ${token}`}})
        setProgress(50)
        setStatus('Generating notes...')
        await axios.post('/api/lecture/generate-notes', {lectureId: id}, {headers:{Authorization:`Bearer ${token}`}})
        setProgress(100)
        setStatus('Completed!')
        setTimeout(() => navigate('/notes/' + id), 1500)
      }catch(err){
        setStatus('Processing failed. Please try again.')
      }
    }
    run()
  },[id, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-8">
        {/* Animated Loading Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-spin opacity-20"></div>
          <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <div className="text-3xl">✨</div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{status}</h2>
          <p className="text-gray-600 dark:text-gray-400">This usually takes 1-3 minutes depending on audio length</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{progress}% complete</p>
        </div>

        {/* Steps */}
        <div className="text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${progress >= 25 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {progress >= 25 ? '✓' : '1'}
            </div>
            <span className="text-gray-700 dark:text-gray-300">Transcribing audio</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${progress >= 50 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {progress >= 50 ? '✓' : '2'}
            </div>
            <span className="text-gray-700 dark:text-gray-300">Generating notes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${progress >= 100 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {progress >= 100 ? '✓' : '3'}
            </div>
            <span className="text-gray-700 dark:text-gray-300">Finalizing...</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">🔄 Don't refresh the page</p>
      </div>
    </div>
  )
}
