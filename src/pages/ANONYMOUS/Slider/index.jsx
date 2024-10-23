import slider_1 from "src/assets/images/slider/slider_1.jpg"
import slider_2 from "src/assets/images/slider/slider_2.jpg"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation"
import "swiper/css/pagination"

import "./styles.scss"
import SvgIcon from "src/components/SvgIcon"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router"

const list = [
  {
    image: slider_1,
    title: "Connecting farms",
    description: "Connecting You to Fresh, Sustainable Agriculture",
    id: 1,
  },
  {
    image: slider_2,
    title: "Protecting health",
    description: "Defending Health, Building Stronger Lives",
    id: 2,
  },
]

const Slider = () => {
  // SwiperCore.use([Autoplay, Pagination, Navigation])

  return (
    <div className="wrap-slider">
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {list.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <SliderItem item={item} active={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
      <SvgIcon name="border" className="footer-slider" />
    </div>
  )
}

export default Slider

const SliderItem = ({ active, item }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`slide-item ${active ? "active" : ""}`}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className="slide-item_title">{item.title}</div>
      <div className="slide-item_description">{item.description}</div>
      <div className="slide-item_btn" onClick={() => navigate(ROUTER.DS_SAN_PHAM)}>
        XEM NGAY
      </div>
    </div>
  )
}
