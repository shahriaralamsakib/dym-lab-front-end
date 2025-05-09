import './style/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

function Navbar({labData}) {
    if (!labData) return null
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FontAwesomeIcon icon={faTractor} style={{ marginRight: '0.5rem' }} />
        {labData.lab_name}
      </div>
      <ul className="navbar-links">
        <li><a href="#lab-info">Lab Info</a></li>
        <li><a href="#professor-info">Professor</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
