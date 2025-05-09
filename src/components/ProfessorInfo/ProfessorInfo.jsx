import './ProfessorInfo.css'
import { useEffect, useState } from 'react'
import { fetchProfessorData } from '../../services/api'

function ProfessorInfo() {
  const [professorData, setProfessorData] = useState(null)

  useEffect(() => {
    fetchProfessorData().then(res => {
          if (res.data.length > 0) setProfessorData(res.data[0])
        })
      }, [])

  return (
    <div className="professor-section" id="professor-info">
      <h2>Professor Information</h2>
      {professorData && (
      <div className="professor-container">
        <div className="professor-image-wrapper">
            {professorData.image && (
            <img src={professorData.image} alt="Professor" className="professor-image" />
            )}
        </div>
        <div className="professor-details">
            <p><strong>Name:</strong> {professorData.name}</p>
            <p><strong>Designation:</strong> {professorData.designation}</p>
            <p><strong>Email:</strong> {professorData.email}</p>
            <p><strong>Bio:</strong> {professorData.bio}</p>
        </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorInfo
