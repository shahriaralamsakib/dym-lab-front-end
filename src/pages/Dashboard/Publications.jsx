import React, { useEffect, useState } from 'react'
import {
  fetchPublicationData,
  createPublication,
  updatePublication,
  deletePublication,
} from '../../services/api'

function Publications() {
  const [publications, setPublications] = useState([])
  const [form, setForm] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    link: '',
  })
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadPublications()
  }, [])

  const loadPublications = async () => {
    try {
      const res = await fetchPublicationData()
      setPublications(res.data)
    } catch (error) {
      console.error('Failed to fetch publications:', error)
    }
  }

  const openModal = (publication = null) => {
    if (publication) {
      setForm({
        title: publication.title,
        authors: publication.authors,
        journal: publication.journal,
        year: publication.year,
        link: publication.link,
      })
      setEditId(publication.id)
    } else {
      setForm({
        title: '',
        authors: '',
        journal: '',
        year: '',
        link: '',
      })
      setEditId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setForm({
      title: '',
      authors: '',
      journal: '',
      year: '',
      link: '',
    })
    setEditId(null)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await updatePublication(editId, form)
      } else {
        await createPublication(form)
      }
      closeModal()
      loadPublications()
    } catch (error) {
      console.error('Failed to save publication:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await deletePublication(id)
        loadPublications()
      } catch (error) {
        console.error('Failed to delete publication:', error)
      }
    }
  }


  return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-extrabold text-gray-800">📚 Publications</h1>
      <button
        onClick={() => openModal()}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
      >
        + Add Publication
      </button>
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <table className="w-full table-auto text-left text-sm">
        <thead className="bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 uppercase tracking-wider text-xs">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Authors</th>
            <th className="p-4">Journal</th>
            <th className="p-4">Year</th>
            <th className="p-4">Link</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((pub) => (
            <tr key={pub.id} className="border-t hover:bg-gray-50 transition duration-200">
              <td className="p-4">{pub.title}</td>
              <td className="p-4">{pub.authors}</td>
              <td className="p-4">{pub.journal}</td>
              <td className="p-4">{pub.year}</td>
              <td className="p-4 text-blue-600 underline break-all">
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.link ? 'View' : 'N/A'}
                </a>
              </td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => openModal(pub)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pub.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {publications.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No publications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
        <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {editId ? 'Edit Publication' : 'Add Publication'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Authors</label>
                <input
                  type="text"
                  name="authors"
                  value={form.authors}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Journal</label>
                <input
                  type="text"
                  name="journal"
                  value={form.journal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Year</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-gray-600 font-medium">Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)
}

export default Publications
