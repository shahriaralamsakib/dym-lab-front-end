import React, { useEffect, useState } from 'react'
import { fetchLabData, patchAbout } from '../../services/api'

function About() {
  const [about, setAbout] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ lab_name: '', overview: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchLabData()
      .then(res => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAbout(res.data)
          setForm(res.data[0])
        }
      })
      .catch(err => {
        console.error('Error fetching about data:', err)
      })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await patchAbout(form.id, form)
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating about:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!about.length) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p className="mb-6">Welcome to the Majeed Agricultural Robotics Lab dashboard.</p>

      {!isEditing ? (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">{form.lab_name}</h2>
          <p className="text-gray-700 mb-4">{form.overview}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium">Lab Name</label>
            <input
              type="text"
              name="lab_name"
              value={form.lab_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Overview</label>
            <textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              rows={6}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default About
