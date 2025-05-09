import { useEffect, useState } from 'react'
import { fetchLabData } from '../../services/api'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProfessorInfo from '../../components/ProfessorInfo/ProfessorInfo'
import './Home.css'

function Home() {
  const [labData, setLabData] = useState(null)

  useEffect(() => {
    fetchLabData().then(res => {
      if (res.data.length > 0) setLabData(res.data[0])
    })
  }, [])

  return (
    <>
      {labData && (
        <div className="lab-section" id="lab-info">
          <h2 className='lab-title'>Mission and Vision</h2>
          <p>{labData.overview}</p>
        </div>
      )}
      <ProfessorInfo />
    </>
  )
}

export default Home