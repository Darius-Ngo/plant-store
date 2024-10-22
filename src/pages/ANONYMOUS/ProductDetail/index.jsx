import { Col, InputNumber, Row, Spin, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import LayoutCommon from "src/components/Common/Layout"
import { setOpenLoginModal } from "src/redux/loginModal"
import ProductService from "src/services/ProductService"
// import SwiperCore, { Autoplay } from "swiper"
import Notice from "src/components/Notice"
import { formatMoneyVND } from "src/lib/utils"
import { setListCart } from "src/redux/appGlobal"
import CartService from "src/services/CartService"
import ProductCard from "../ProductCard"
import { InputChangeQuantity, ProductDetailStyle, TabsStyled } from "./styled"

const ProductDetail = () => {
  const { userInfo, listCart } = useSelector(state => state?.appGlobal)
  console.log('listCart: ', listCart);
  const { product } = useLocation().state
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [listProduct, setListProduct] = useState([])
  const [tabActive, setTabActive] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [cartInfo, setCartInfo] = useState()


  const getListProduct = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getProductByFilters({
        category: product?.category,
      })
      if (!res.data) return
      setListProduct(res?.data?.content)
    } finally {
      setLoading(false)
    }
  }

  const getListCart = async user_id => {
    try {
      setLoading(true)
      const res = await CartService.getListCart(user_id)
      dispatch(setListCart(res.data || []))
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async () => {
    if (userInfo.id && product) {
      try {
        setLoading(true)
        const body = {
          product_id: product?.id,
          quantity: quantity,
          user_id: userInfo.id,
        }
        const res = await CartService.addToCart(body)
        if (res.isError) return
        Notice({
          msg: "Thêm sản phẩm vào giỏ hàng thành công.",
        })
        setAdded(true)
        getListCart(userInfo.id)
      } finally {
        setLoading(false)
      }
    } else {
      dispatch(setOpenLoginModal(true))
    }
  }
  const handleUpdateOrder = async () => {
    if (userInfo.id && product) {
      try {
        setLoading(true)
        const body = {
          product_id: product?.id,
          quantity: quantity,
        }
        const res = await CartService.updateCart(cartInfo.id, body)
        if (res.isError) return
        Notice({
          msg: "Cập nhật giỏ hàng thành công.",
        })
        setAdded(true)
        getListCart(userInfo.id)
      } finally {
        setLoading(false)
      }
    } else {
      dispatch(setOpenLoginModal(true))
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    getListProduct()
    if(!!listCart?.length && listCart.find(i => i.product_id === product?.id)) {
      const cartInfo = listCart.find(i => i.product_id === product?.id)
      setAdded(true)
      setCartInfo(cartInfo)
      setQuantity(cartInfo.quantity)
    } else {
      setAdded(false)
      setCartInfo({})
      setQuantity(1)
    }
  }, [product, listCart])

  const items = [
    {
      label: "Mô tả ",
      key: 1,
      children: (
        <div
          className="product-description"
          style={{ width: "90%" }}
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      ),
    },
  ]
  return (
    <ProductDetailStyle>
      <Spin spinning={loading}>
        <div className="container-product-detail-page_content">
          <LayoutCommon>
            <div className="wrap-info">
              <Row gutter={16}>
                <Col span={8}>
                    <div className="wrap-img">
                      <img
                        src={product?.imageUrl}
                        alt={product?.name}
                      />
                    </div>
                </Col>
                <Col span={12}>
                  <div className="wrap-content">
                    <div>
                      <div className="product-detail-title">
                        {product?.name}
                      </div>
                    </div>
                    <div>
                      <div className="product-option">
                        <div className="d-flex align-items-center mb-12">
                          <div className="fs-16 fw-600 mr-6 title-item">
                            Loại:
                          </div>
                          <div className="fs-20">
                            <strong>
                              {product.category}
                            </strong>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="fs-16 fw-600 mr-6 title-item">
                            Giá:{" "}
                          </div>
                          <div className="product-price">
                            <strong>
                              {formatMoneyVND(
                                product.price,
                              )}
                            </strong>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="fs-16 fw-600 mr-6 title-item">
                            Số lượng:{" "}
                          </div>
                          <InputChangeQuantity>
                            <button
                              className="btn-change"
                              disabled={quantity === 1}
                              onClick={() => setQuantity(quantity - 1)}
                            >
                              -
                            </button>
                            <InputNumber
                              className="input-change"
                              value={quantity}
                              onChange={value => setQuantity(value)}
                              min={1}
                              max={100}
                              step={1}
                              keyboard={false}
                              // formatter={value => `${value}%`}
                              // parser={value => value.replace("%", "")}
                            />
                            <button
                              className="btn-change"
                              disabled={quantity >= 100}
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              +
                            </button>
                          </InputChangeQuantity>
                        </div>
                      </div>
                      {!added ? ( 
                        <div className="btn-order" onClick={handleOrder}>
                          THÊM VÀO GIỎ
                        </div>
                      ) : (
                        <div className="btn-order" onClick={handleUpdateOrder}>CẬP NHẬT VÀO GIỎ</div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </LayoutCommon>
          <LayoutCommon>
            <Row gutter={16}>
              <Col span={18} style={{ minHeight: 300 }}>
                <div className="wrap-info mt-20 h-100">
                  <TabsStyled>
                    <Tabs
                      activeKey={tabActive}
                      onChange={key => setTabActive(prev => key)}
                      items={items}
                    />
                  </TabsStyled>
                </div>
              </Col>
              <Col span={6}>
                <div className="wrap-info mt-20 h-100">
                  <TabsStyled>
                    <Tabs
                      items={[
                        {
                          label: "Sản phẩm tương tự",
                          key: 1,
                          children: (
                            <Row
                              gutter={[16, 16]}
                              className="list-product_relative"
                            >
                              {listProduct
                                ?.filter(i => i.id !== product.id)
                                ?.map((product, i) => (
                                  <Col span={24} key={product.id}>
                                    <ProductCard product={product} />
                                  </Col>
                                ))}
                            </Row>
                          ),
                        },
                      ]}
                    />
                  </TabsStyled>
                </div>
              </Col>
            </Row>
          </LayoutCommon>
        </div>
      </Spin>
    </ProductDetailStyle>
  )
}

export default ProductDetail
