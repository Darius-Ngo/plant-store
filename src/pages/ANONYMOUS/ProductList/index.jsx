import { Col, Input, InputNumber, Pagination, Row, Space, Tabs } from "antd"
import { useEffect, useState } from "react"
import LayoutCommon from "src/components/Common/Layout/index.js"
import Button from "src/components/MyButton/Button/index.js"
import SpinCustom from "src/components/Spin/index.js"
import ProductService from "src/services/ProductService/index.js"
import ProductCard from "../ProductCard/index.jsx"
import "./styled.js"
import { ProductListStyle } from "./styled.js"
const ProductList = () => {
  const [loading, setLoading] = useState(false)
  const [listProducts, setListProducts] = useState([])
  const [categoryName, setCategoryName] = useState("Đà Lạt")
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
  }, [page, pageSize, categoryName])

  return (
    <ProductListStyle>
      <SpinCustom spinning={loading}>
        <LayoutCommon>
          <Row className="mb-16" gutter={[16, 16]}>
            <Col xs={24} mb={10} lg={10}>
              {/* <Input
                allowClear
                placeholder="Tìm theo loại sản phẩm"
                onChange={e => setCategoryName(e.target.value)}
              /> */}
              <Tabs
                type="card"
                size={"small"}
                activeKey={categoryName}
                onChange={key => setCategoryName(key)}
                items={[
                  {
                    label: `Đặc sản Đà Lạt`,
                    key: "Đà Lạt",
                  },
                  {
                    label: `Đặc sản Bình Phước`,
                    key: "Bình Phước",
                  },
                  {
                    label: `Đặc sản Bến Tre`,
                    key: "Bến Tre",
                  },
                ]}
              />
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
      </SpinCustom>
    </ProductListStyle>
  )
}

export default ProductList
