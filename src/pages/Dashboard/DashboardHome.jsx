import React, { useEffect, useState } from 'react'
import { fetchProfessorData, fetchPublicationData, fetchStudentsData, fetchNewsEventsData } from '../../services/api'

function DashboardHome() {
  const [professor, setProfessor] = useState(null)
  const [publications, setPublications] = useState([])
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [students, setStudents] = useState([])
  const [newsEvents, setNewsEvents] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const profData = await fetchProfessorData()
        const pubData = await fetchPublicationData()
        const stuData = await fetchStudentsData()
        const newsData = await fetchNewsEventsData()
        console.log('pubData', pubData.data.length)

        setProfessor(profData)
        setPublications(pubData.data.length)
        setStudents(stuData.data.length)
        setNewsEvents(newsData.data.length)

        // Dummy logic to estimate profile completion
        const filledFields = Object.values(profData).filter(Boolean).length
        const totalFields = Object.keys(profData).length
        const completion = Math.round((filledFields / totalFields) * 100)
        setProfileCompletion(completion)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    fetchData()
  }, [])
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>
      <p className="mb-8 text-gray-600">Welcome to the Majeed Agricultural Robotics Lab dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
          {professor ? (
            <>
              <p className="text-gray-500">Completed: {profileCompletion}%</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Loading profile...</p>
          )}
        </div>

        {/* Publication Count */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Publications</h2>
          <p className="text-2xl font-bold text-blue-600">{publications}</p>
          <p className="text-gray-500">Total Publications</p>
        </div>

        {/* News & Events (Placeholder for future data) */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">News & Events</h2>
          <p className="text-2xl font-bold text-yellow-600">{newsEvents}</p>
          <p className="text-gray-500">Recent Announcements</p>
        </div>

        {/* University Info (Optional static or from profile) */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">University Info</h2>
          <p className="text-gray-500">Status: <span className="font-medium text-green-600">Active</span></p>
        </div>

        {/* Completion Summary */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Active Students</h2>
          <p className="text-xl font-bold text-purple-600">{students}</p>
          <p className="text-gray-500">Total Students in Lab</p>
        </div>

        {/* Completion Summary */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Completion Summary</h2>
          <p className="text-xl font-bold text-cyan-600">{profileCompletion}%</p>
          <p className="text-gray-500">Overall Dashboard Completion</p>
        </div>
      </div>

    </div>
  )
}

export default DashboardHome
