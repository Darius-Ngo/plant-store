import { Col, Image, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import { OtherInfoStyle } from "../styled"
import img1 from "src/assets/images/home/service/img_1.png"
import img2 from "src/assets/images/home/service/img_2.png"
import img3 from "src/assets/images/home/service/img_3.png"
import img4 from "src/assets/images/home/service/img_3.png"
import slide0 from "src/assets/images/home/slide/slide-home_0.png"
import slide1 from "src/assets/images/home/slide/slide-home_1.jpg"
import slide2 from "src/assets/images/home/slide/slide-home_2.jpg"
import slide3 from "src/assets/images/home/slide/slide-home_3.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { FAILBACK } from "src/constants/constants"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SvgIcon from "src/components/SvgIcon"
import ROUTER from "src/router"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import useDeviceType from "src/lib/useDeviceType"
const OtherInfo = () => {
  const { isMobile } = useDeviceType()
  const navigate = useNavigate()
  const listDataMachine = [
    {
      img: img1,
      title: "Sản phẩm tươi mới",
      description: "Sản phẩm luôn đảm bảo sự tươi mới, chất lượng tuyệt vời.",
    },
    {
      img: img2,
      title: "Đảm bảo sức khỏe",
      description:
        "Đảm bảo an toàn sức khỏe, có kiểm định thực phẩm được chứng nhận.",
    },
    {
      img: img3,
      title: "Giao hàng nhanh",
      description: "Giao hàng nhanh chóng, đáp ứng nhu cầu của người dùng",
    },
  ]
  return (
    <OtherInfoStyle>
      <div style={{ backgroundColor: "rgba(0,0,0,0.1)" }} className="pb-50">
        <SvgIcon
          name="border-white-bt"
          style={{ transform: "rotate(180deg)" }}
          className="mb-50"
        />
        <LayoutCommon>
          <Col span={24}>
            <Row gutter={0}>
              <Col xs={24} lg={12}>
                <div className="left-slide h-100">
                  <img
                    src={slide0}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="content-slide d-flex flex-column justify-content-space-between">
                    <div>
                      <div className="title-slide text-uppercase">
                        Thưởng thức sản phẩm và <br /> dịch vụ chất lượng cao
                      </div>
                      <div
                        className="fs-14 fw-600 mt-30"
                        style={{ width: "50%" }}
                      >
                        Chúng tôi cam kết mang đến cho bạn những sản phẩm tươi
                        mới và đảm bảo chất lượng nhất.
                      </div>
                    </div>
                    <div
                      className="fs-16 d-flex align-items-center fw-600 pointer"
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                        navigate(ROUTER.DS_SAN_PHAM)
                      }}
                    >
                      Sản phẩm <ArrowRightOutlined className="ml-8" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Swiper
                  direction={"vertical"}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src={slide1} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slide2} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slide3} alt="" />
                  </SwiperSlide>
                </Swiper>
              </Col>
            </Row>
          </Col>
        </LayoutCommon>
      </div>
      <SvgIcon
        name="border"
        style={{ transform: "rotate(180deg)" }}
        className="icon-gray"
      />
      <div className="pt-50 pb-0">
        <LayoutCommon>
          <div className="title-home">Dịch vụ</div>
          <Row gutter={36}>
            {listDataMachine.map((i, idx) => (
              <Col xs={24} lg={8} key={idx} className="text-center">
                <Image
                  preview={false}
                  src={i.img}
                  width={120}
                  fallback={FAILBACK}
                />
                <div className="fw-600 fs-16 mt-16 mb-16 text-uppercase">
                  {i.title}
                </div>
                <div className="" style={{ lineHeight: 1.5 }}>
                  {i.description}
                </div>
              </Col>
            ))}
          </Row>
        </LayoutCommon>
      </div>
    </OtherInfoStyle>
  )
}
export default OtherInfo
