import { Col, Input, InputNumber, Pagination, Row, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import LayoutCommon from "src/components/Common/Layout/index.js"
import CategoryService from "src/services/CategoryService"
import "./styled.js"
import { MenuPageStyle } from "./styled.js"
import FlInput from "src/components/FloatingLabel/Input/index.js"
import ProductService from "src/services/ProductService/index.js"
import ProductCard from "../ProductCard/index.jsx"
import Button from "src/components/MyButton/Button/index.js"
const MenuPage = () => {
  const [loading, setLoading] = useState(false)
  const [listProducts, setListProducts] = useState([])
  const [categoryName, setCategoryName] = useState()
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const getProductByFilters = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getProductByFilters({
        category: categoryName,
        min_price: minPrice,
        max_price: maxPrice,
        page: page,
        size: pageSize,
      })
      if (!res.data) return
      setListProducts(res.data.content)
      setTotal(res.data.totalElements)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    window.scroll(0, 0)
    getProductByFilters()
  }, [page, pageSize])

  return (
    <MenuPageStyle>
      <Spin spinning={loading}>
        <LayoutCommon>
          <Row className="mb-16" gutter={[16, 16]}>
            <Col xs={24} mb={10} lg={10}>
              <Input allowClear placeholder="Tìm theo loại sản phẩm" onChange={e => setCategoryName(e.target.value)} />
            </Col>
            <Col xs={24} mb={6} lg={6}>
              <InputNumber
                placeholder="Giá thấp nhất"
                min={0}
                onChange={setMinPrice}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Col>
            <Col xs={24} mb={6} lg={6}>
              <InputNumber
                placeholder="Giá cáo nhất"
                min={0}
                onChange={setMaxPrice}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Col>
            <Col xs={24} mb={2} lg={2}>
              <Button
                loading={loading}
                btnType="orange"
                onClick={getProductByFilters}
              >
                Tìm kiếm
              </Button>
            </Col>
          </Row>
            <Space size={16} wrap={true}>
            {listProducts.map((product, i) => (
              <ProductCard product={product} isSmall={true} />
            ))}
            </Space>
          <div className="d-flex align-items-center justify-content-center mt-24 w-100">
            <Pagination
              className="d-flex"
              showTotal={total => `Tổng ${total} sản phẩm`}
              total={total}
              current={page}
              pageSize={pageSize}
              showSizeChanger={false}
              hideOnSinglePage={true}
              onChange={(page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
              }}
            />
          </div>
        </LayoutCommon>
      </Spin>
    </MenuPageStyle>
  )
}

export default MenuPage
