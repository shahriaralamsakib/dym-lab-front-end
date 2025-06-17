import './Footer.css'
import React, { useEffect, useState } from 'react'
import { fetchUniversityData } from '../../services/api'
import { Link } from 'react-router-dom'

function Footer() {
  const [university, setUniversity] = useState(null)

  useEffect(() => {
    fetchUniversityData().then(res => {
      if (res.data) {
        setUniversity(res.data)
        console.log('University data fetched:', res.data)
      }
    })
  }, [])

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: University Info */}
        <div className="footer-section university-info">
          {university && (
            <>
              <p><strong>{university[0].name}</strong></p>
              <p>{university[0].address}</p>
              <p>
                Website: <a href={university[0].website} target="_blank" rel="noreferrer">{university[0].website}</a>
              </p>
            </>
          )}
        </div>

        {/* Center: Navbar Links (Example) */}
        <div className="footer-section footer-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Lab</Link></li>
            <li><Link to="/publications">Publications</Link></li>
            <li><Link to="/news-events">News & Events</Link></li>
          </ul>
        </div>

        {/* Right: Map */}
        <div className="footer-section footer-map">
          {university && (
            <div className="map-container">
              <iframe
                title="University Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(university[0].address)}&output=embed`}
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lab Management System. All rights reserved.</p>
        <p>
          Made with ❤️ by <a href="#" target="_blank" rel="noreferrer">Md. Shahriar Alam Sakib</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
