import { Col, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductCard from "../../ProductCard"
import { ProductPopularStyle } from "../styled"
import useDeviceType from "src/lib/useDeviceType"

const ProductPopular = ({ listProduct }) => {
  const { isMobile } = useDeviceType()
  return (
    <ProductPopularStyle className={`${isMobile ? "mobile-view" : ""}`}>
      <LayoutCommon>
        <div className={`title-home ${isMobile ? "fs-20" : ""}`}>
          Sản phẩm bán chạy
        </div>
        <Row gutter={[16, 16]}>
          {!!isMobile ? (
            listProduct.map((product, i) => (
              <Col key={i} xs={24} md={12}>
                <ProductCard product={product} isSmall={isMobile} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div className="product-list">
                <Swiper
                  grabCursor={true}
                  spaceBetween={30}
                  slidesPerView={5}
                  autoplay={{ delay: 2000 }}
                  // navigation={true}
                  modules={[Navigation, Autoplay]}
                >
                  {listProduct.map((product, i) => (
                    <SwiperSlide key={i}>
                      <ProductCard product={product} isSmall={isMobile} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
          )}
        </Row>
      </LayoutCommon>
    </ProductPopularStyle>
  )
}
export default ProductPopular
