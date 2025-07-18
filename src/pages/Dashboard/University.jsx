import React, { useEffect, useState } from 'react'
import { fetchUniversityData, patchUniversity } from '../../services/api'

function University() {
  const [university, setUniversity] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ name: '', address: '', website: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchUniversityData()
      .then(res => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setUniversity(res.data)
          setForm(res.data[0])
        }
      })
      .catch(err => {
        console.error('Error fetching university data:', err)
      })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await patchUniversity(form.id, form)
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating university:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!university.length) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">University Information</h1>

      {!isEditing ? (
        <>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Address:</strong> {form.address}</p>
          <p><strong>Website Link:</strong> <a href={form.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{form.website}</a></p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
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

export default University
