import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import './Dashboard.css'
import {
  Home,
  User,
  BookOpen,
  Newspaper,
  Info,
  GraduationCap,
  Users,
  LogOut
} from 'lucide-react';



function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  // Function to dynamically set the class for active NavLink
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Majeed Lab</h2>
        <nav className="nav-menu">
          <NavLink to="home" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <Home size={18} /> <span>Home</span>
            </span>
          </NavLink>

          <NavLink to="profile" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <User size={18} /> <span>Profile</span>
            </span>
          </NavLink>

          <NavLink to="publications" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <BookOpen size={18} /> <span>Publications</span>
            </span>
          </NavLink>

          <NavLink to="news" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <Newspaper size={18} /> <span>News & Events</span>
            </span>
          </NavLink>

          <NavLink to="about" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <Info size={18} /> <span>About</span>
            </span>
          </NavLink>

          <NavLink to="university" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <GraduationCap size={18} /> <span>University</span>
            </span>
          </NavLink>

          <NavLink to="students" className={getNavLinkClass}>
            <span className="flex items-center gap-2">
              <Users size={18} /> <span>Students</span>
            </span>
          </NavLink>

          <button className="logout-btn">
            <span className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut size={18} /> <span>Logout</span>
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
