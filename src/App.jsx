import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Publications from './pages/Publications/Publications'
import NewsEvents from './pages/NewsEvents/NewsEvents'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardHome from './pages/Dashboard/DashboardHome'
import Profile from './pages/Dashboard/Profile'
import DashboardPublications from './pages/Dashboard/Publications'
import News from './pages/Dashboard/News'
import DashboardAbout from './pages/Dashboard/About'
import University from './pages/Dashboard/University'
import Students from './pages/Dashboard/Students'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import Layout from './components/Preloader/Layout'
import PrivateRoute from './routes/PrivateRoute'
import React from 'react'

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <Layout>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="publications" element={<DashboardPublications />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<DashboardAbout />} />
          <Route path="university" element={<University />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
