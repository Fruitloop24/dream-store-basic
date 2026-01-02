import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light text-zinc-100 mb-4">Contact</h1>
        <p className="text-zinc-500">
          Questions, feedback, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-12">
          <p className="text-zinc-300 mb-4">Thanks for reaching out.</p>
          <p className="text-zinc-500 text-sm mb-6">We'll get back to you as soon as we can.</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', message: '' })
            }}
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors resize-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-zinc-100 text-zinc-900 rounded font-medium hover:bg-white transition-colors"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Contact Info */}
      <div className="mt-12 pt-10 border-t border-zinc-900">
        <p className="text-zinc-500 text-sm">
          You can also email us directly at{' '}
          <a href="mailto:hello@example.com" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            hello@example.com
          </a>
        </p>
      </div>
    </div>
  )
}
