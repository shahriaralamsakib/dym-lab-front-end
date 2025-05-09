import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Publications from './pages/Publications/Publications'
import NewsEvents from './pages/NewsEvents/NewsEvents'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/news-events" element={<NewsEvents />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
