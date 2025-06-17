import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Publications from './pages/Publications/Publications'
import NewsEvents from './pages/NewsEvents/NewsEvents'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import Layout from './components/Preloader/Layout'

function App() {
  return (
    <Router>
      <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      </Layout>
    </Router>
  )
}

export default App
