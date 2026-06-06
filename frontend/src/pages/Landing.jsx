import React from 'react'
import { Link } from 'react-router-dom'
import { SparklesIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Landing(){
  const features = [
    { icon: SparklesIcon, title: 'AI-Powered', desc: 'IBM Granite AI for intelligent transcription' },
    { icon: DocumentTextIcon, title: 'Smart Notes', desc: 'Auto-generated summaries & key points' },
    { icon: ClockIcon, title: 'Save Time', desc: 'Convert hours of lectures in minutes' },
    { icon: CheckCircleIcon, title: 'Organized', desc: 'Well-structured, easy-to-review notes' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            🎓 LectureNotes AI
          </h1>
          <nav className="flex gap-6">
            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium transition">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Transform Your Lectures into <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Smart Notes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Upload audio lectures and let AI instantly generate structured notes, summaries, and key points. Perfect for students who want to learn efficiently.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition transform">
              🚀 Get Started Free
            </Link>
            <a href="#features" className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition">
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">⚡ 10x</p>
              <p className="text-gray-600 dark:text-gray-400">Faster note-taking</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600">📚 100%</p>
              <p className="text-gray-600 dark:text-gray-400">No info lost</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">✨ AI-Powered</p>
              <p className="text-gray-600 dark:text-gray-400">Smart summaries</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-32 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">Why Choose LectureNotes AI?</h3>
            <p className="text-gray-600 dark:text-gray-400">Powerful features designed for modern learners</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="group bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition transform duration-300">
                  <Icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-125 transition" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-32 bg-white dark:bg-gray-800 rounded-2xl p-12 space-y-8">
          <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { num: '1️⃣', title: 'Upload', desc: 'Drop your lecture audio file' },
              { num: '2️⃣', title: 'Process', desc: 'AI analyzes and transcribes' },
              { num: '3️⃣', title: 'Download', desc: 'Get beautiful, organized notes' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl mb-3">{step.num}</p>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="mt-32 text-center space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Transform Your Learning?</h3>
          <Link to="/register" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-2xl transition">
            Start Free Today →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 text-gray-400 py-12 text-center">
        <p>© 2024 LectureNotes AI • Making learning more efficient</p>
      </footer>
    </div>
  )
}
