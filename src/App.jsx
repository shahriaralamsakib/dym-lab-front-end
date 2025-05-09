import { useEffect, useState } from 'react'
import './style/App.css'
import Navbar from './Navbar'
import ProfessorInfo from './ProfessorInfo'

function App() {
  const [labData, setLabData] = useState(null)
  const [professorData, setProfessorData] = useState(null)

  useEffect(() => {
    // Fetch lab data
    fetch(`${import.meta.env.VITE_API_URL}home/`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setLabData(data[0])
        }
      })
      .catch(err => console.error('Error fetching lab data:', err))

    // Fetch professor data
    fetch(`${import.meta.env.VITE_API_URL}professor/`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setProfessorData(data[0]) // Assuming you only need the first professor
        }
      })
      .catch(err => console.error('Error fetching professor data:', err))
  }, [])

  return (
    <>
      <Navbar labData={labData} />
      {labData && (
        <div className="lab-section" id="lab-info">
          <h2>{labData.lab_name}</h2>
          <p>{labData.overview}</p>
        </div>
      )}
      <ProfessorInfo professor={professorData} />
    </>
  )
}

export default App
