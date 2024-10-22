import { Col, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductCard from "../../ProductCard"
import { ProductPopularStyle } from "../styled"

const ProductPopular = ({ listProduct }) => {
  return (
    <ProductPopularStyle>
      <LayoutCommon>
        <div className="title-home">Sản phẩm bán chạy</div>
        <Row>
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
                    <ProductCard product={product} isSmall={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </LayoutCommon>
    </ProductPopularStyle>
  )
}
export default ProductPopular
