import './Navbar.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { fetchLabData } from '../../services/api'
import { LockClosedIcon } from '@heroicons/react/24/solid'

function Navbar() {
  const [labData, setLabData] = useState(null)

  useEffect(() => {
      fetchLabData().then(res => {
        if (res.data.length > 0) setLabData(res.data[0])
      })

  }, [])
  return (
    <nav className="navbar">
      {labData && (
      <div className="navbar-logo">
        <FontAwesomeIcon icon={faTractor} style={{ marginRight: '0.5rem' }} />
        {labData.lab_name}
      </div>
      )}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Lab</Link></li>
        <li><Link to="/publications">Publications</Link></li>
        <li><Link to="/news-events">News & Events</Link></li>
        <li><Link to="/login"><LockClosedIcon className="w-6 h-6 text-white" /></Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
