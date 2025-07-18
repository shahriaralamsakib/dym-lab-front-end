import React, { useEffect, useState } from 'react'
import {
  fetchStudentsData,
  createStudent,
  updateStudent,
  deleteStudent
} from '../../services/api'

function Students() {
  const [students, setStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editId, setEditId] = useState(null)

  /* ---------- helpers ---------- */
  function initialForm() {
    return {
      name: '',
      designation: '',
      research_interests: '',
      email: '',
      start_date: '',
      end_date: '',
      bio: '',
      image: null,           // ← file
      is_alumni: false,
      is_active: true,
    }
  }

  const loadStudents = () => {
    fetchStudentsData()
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setStudents(res.data)
        }
      })
      .catch(err => console.error('Error fetching students:', err))
  }

  /* ---------- lifecycle ---------- */
  useEffect(loadStudents, [])

  /* ---------- modal actions ---------- */
  const openAddModal = () => {
    setForm(initialForm())
    setEditId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (student) => {
    const { id, ...fields } = student
    setForm({ ...fields, image: null })   // image will be re‑chosen
    setEditId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  /* ---------- form handlers ---------- */
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : type === 'file'
          ? files[0]          // file object
          : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // build multipart payload
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (val !== null && val !== '') data.append(key, val)
      })

      if (editId) {
        await updateStudent(editId, data)
      } else {
        await createStudent(data)
      }

      closeModal()
      loadStudents()
    } catch (err) {
      console.error('Error saving student:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try {
      await deleteStudent(id)
      loadStudents()
    } catch (err) {
      console.error('Error deleting student:', err)
    }
  }

  /* ---------- render ---------- */
  return (
  <div className="p-6 max-w-6xl mx-auto">
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">🎓 Students</h1>
        <p className="text-gray-600 mt-1">Manage your lab members efficiently.</p>
      </div>
      <button
        onClick={openAddModal}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition"
      >
        + Add Student
      </button>
    </div>

    {/* Students List */}
    <div className="space-y-6">
      {students.map((stu) => (
        <div
          key={stu.id}
          className="flex flex-col md:flex-row gap-6 bg-white border rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-200 mr-4 mb-6"
        >
          <div className="md:w-48 flex-shrink-0">
            <img
              src={stu.image}
              alt={stu.name}
              className="w-48 h-48 object-cover rounded-xl border shadow-sm"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">{stu.name}</h2>
              <div className="text-sm flex">
  <button
    onClick={() => openEditModal(stu)}
    className="text-yellow-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-yellow-100 mr-3"
  >
    ✏️ Edit
  </button>
  <button
    onClick={() => handleDelete(stu.id)}
    className="text-red-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-red-100"
  >
    🗑️ Delete
  </button>
</div>

            </div>
            <p className="text-gray-600">{stu.designation}</p>
            <p className="text-sm"><strong>Research:</strong> {stu.research_interests}</p>
            <p className="text-sm"><strong>Email:</strong> {stu.email}</p>
            <p className="text-sm"><strong>Start:</strong> {stu.start_date}</p>
            {stu.end_date && <p className="text-sm"><strong>End:</strong> {stu.end_date}</p>}
            <p className="text-sm text-gray-700 mt-1">{stu.bio}</p>

            <div className="flex gap-2 mt-2">
              {stu.is_alumni && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                  🎓 Alumni
                </span>
              )}
              {!stu.is_active && (
                <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                  🚫 Inactive
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative overflow-auto max-h-[90vh]">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            title="Close"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editId ? '✏️ Edit Student' : '➕ Add Student'}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 text-gray-700">
            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <div>
              <label className="text-sm font-medium">Image File</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block w-full mt-1 border rounded p-2"
              />
            </div>
            <Input label="Start Date" name="start_date" type="date" value={form.start_date} onChange={handleChange} />
            <Input label="End Date" name="end_date" type="date" value={form.end_date} onChange={handleChange} />

            <div className="col-span-2">
              <label className="block text-sm font-medium">Research Interests</label>
              <textarea
                name="research_interests"
                rows={2}
                value={form.research_interests}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center col-span-2 gap-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="is_alumni"
                  checked={form.is_alumni}
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm">Alumni</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm">Active</span>
              </label>
            </div>

            <div className="col-span-2 flex gap-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving…' : editId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)

}

/* small wrapper for simple inputs */
function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </label>
  )
}

export default Students
