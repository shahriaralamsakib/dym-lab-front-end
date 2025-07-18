import React, { useEffect, useState } from 'react'
import { fetchProfessorData, patchProfessor } from '../../services/api'

function Profile() {
  const [professor, setProfessor] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchProfessorData()
      .then(res => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProfessor(res.data)
        }
      })
      .catch(err => {
        console.error('Error fetching professor data:', err)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] })
      setImagePreview(URL.createObjectURL(files[0]))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

//   const handleSubmit = async (e) => {
//   e.preventDefault()
//   try {
//     const data = new FormData()
//     for (let key in formData) {
//       // ✅ Only append image if it's a File
//       if (key === 'image') {
//         if (formData.image instanceof File) {
//           data.append('image', formData.image)
//         }
//       } else {
//         data.append(key, formData[key])
//       }
//     }

//     const res = await patchProfessor(formData.id, data) // 👈 Pass professor ID here

//     if (res.ok || res.status === 200) {
//       setEditMode(false)
//       const refreshed = await fetchProfessorData()
//       if (refreshed && refreshed.data) {
//         setProfessor(refreshed.data)
//       }
//     }
//   } catch (err) {
//     console.error('Failed to update professor:', err)
//   }
// }

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const data = new FormData()

    // ✅ Append all fields, only include image if it's a File
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image') {
        if (value instanceof File) {
          data.append('image', value)
        }
      } else {
        data.append(key, value)
      }
    })

    // ✅ Send PATCH request
    const res = await patchProfessor(formData.id, data)

    if (res.ok || res.status === 200) {
      setEditMode(false)
      setImagePreview(null)
      const refreshed = await fetchProfessorData()
      if (refreshed && refreshed.data) {
        setProfessor(refreshed.data)
      }
    }
  } catch (err) {
    console.error('Failed to update professor:', err)
  }
}



  const handleEdit = () => {
    setFormData(professor[0])
    setImagePreview(professor[0].image)
    setEditMode(true)
  }

  // console.log('professor', professor[0].id)

  if (!professor.length) return <p className="text-center mt-10">Loading...</p>

  return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-12">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
      👨‍🏫 Professor Profile
    </h1>

    {editMode && formData ? (
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-auto rounded-md border shadow mt-1"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Designation</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Affiliation</label>
            <input
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Short Bio</label>
            <input
              name="short_bio"
              value={formData.short_bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Full Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setEditMode(false)
              setImagePreview(null)
            }}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    ) : (
      <div className="space-y-5 text-gray-700">
        <div className="flex justify-end p-2">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-semibold mr-2"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
          <img
            src={professor[0].image}
            alt="Professor"
            className="w-32 h-full rounded-lg border-none shadow mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{professor[0].name}</h2>
            <p className="text-gray-600">{professor[0].designation}</p>
            <p className="text-sm text-gray-500">{professor[0].email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p><span className="font-semibold">Affiliation:</span> {professor[0].affiliation}</p>
          <p><span className="font-semibold">Short Bio:</span> {professor[0].short_bio}</p>
          <div>
            <span className="font-semibold">Bio:</span>
            <p className="mt-1 text-justify">{professor[0].bio}</p>
          </div>
        </div>
      </div>
    )}
  </div>
)

}

export default Profile
