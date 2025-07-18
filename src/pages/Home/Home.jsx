// Home.jsx
import { useEffect, useState } from 'react'
import { fetchLabData, fetchbanners } from '../../services/api'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProfessorInfo from '../../components/ProfessorInfo/ProfessorInfo'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './Home.css'

function Home() {
  const [labData, setLabData] = useState(null)
  const [banners, setBanners] = useState([])

  useEffect(() => {
    fetchLabData().then(res => {
      if (res.data.length > 0) setLabData(res.data[0])
    }).catch(err => {
      console.error('Error fetching lab data:', err)
    })

    fetchbanners().then(res => {
      if (res.data.length > 0) setBanners(res.data)
    }).catch(err => {
      console.error('Error fetching banners:', err)
    })
  }, [])

  return (
    <>
      

      {/* Lab Section */}
      {labData && (
        <div className="lab-section" id="lab-info">
          <h2 className='lab-title'>Mission and Vision</h2>
          <p>{labData.overview}</p>
        </div>
      )}

      {/* Banner Carousel Section */}
      {banners.length > 0 && (
        <div className="banner-carousel">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="banner-slide">
                  <img src={banner.image} alt={`Banner ${index + 1}`} />
                  {banner.caption && <h3 className="banner-caption">{banner.caption}</h3>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <ProfessorInfo />
    </>
  )
}

export default Home
