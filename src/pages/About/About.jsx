import './About.css'
import React, { useEffect, useState } from 'react'
import { fetchAboutData } from  '../../services/api'

function About() {
    const [aboutData, setAboutData] = useState(null)

    useEffect(() =>{
        fetchAboutData().then(res => {
            if(res.data.length > 0) setAboutData(res.data[0])
        })
    }, [])
  return (
    <div className="about-container">
    {aboutData && (
    <div>
      <h1>About Lab</h1>
      <p><strong>{aboutData.lab_focus}</strong></p>
      <p>{aboutData.lab_description}</p>
    </div>
    )}
    </div>
  )
}

export default About
