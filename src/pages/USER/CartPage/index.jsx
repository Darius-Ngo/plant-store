import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { Col, Image, InputNumber, Row } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import { formatMoneyVND } from "src/lib/utils"
import { InputChangeQuantity } from "src/pages/ANONYMOUS/ProductDetail/styled"
import { setListCart } from "src/redux/appGlobal"
import CartService from "src/services/CartService"
import InfoOrder from "./components/InfoOrder"
import { CartPageStyle } from "./styled"

const CartPage = () => {
  const { listCart, userInfo } = useSelector(state => state.appGlobal)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [openInfoOrder, setOpenInfoOrder] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0)

  const handleUpdateQuantity = async (cart_id, body) => {
    try {
      setLoading(true)
      const res = await CartService.updateCart(cart_id, body)
      if (res.isError) return
      await getListCart(userInfo.id)
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

  const handleDeleteProduct = async id => {
    try {
      setLoading(true)
      const res = await CartService.deleteCart(id)
      Notice({
        msg: "Xóa thành công.",
      })
      await getListCart(userInfo.id)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTotalMoney(
      listCart.reduce((total, i) => total + i?.quantity * i?.Product?.price, 0),
    )
  }, [listCart])

  const columns = [
    {
      title: `Sản phẩm`,
      dataIndex: "Product",
      key: "Product",
      align: "left",
      render: (value, record, index) => (
        <div className="d-flex align-items-center justify-content-flex-start">
          <Image
            src={value?.imageUrl}
            width={50}
            alt={"image"}
            preview={false}
          />
          <div className="ml-8">
            <div
              style={{ color: "var(--color-brown-dark)" }}
              className="fw-600"
            >
              {value?.name}
            </div>
            <div className="fs-12" style={{ color: "var(--color-yellow)" }}>
              x {record?.quantity}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: `Giá`,
      dataIndex: "Product",
      key: "Product2",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <div className="d-flex flex-column">
          <strong style={{ color: "var(--color-brown-dark)" }}>
            {formatMoneyVND(value.price)}
          </strong>
        </div>
      ),
    },
    {
      title: `Số lượng`,
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <InputChangeQuantity>
          <button
            className="btn-change"
            disabled={value === 1}
            onClick={() =>
              handleUpdateQuantity(record.id, {
                quantity: value - 1,
                product_id: record?.Product?.id,
              })
            }
          >
            -
          </button>
          <InputNumber
            className="input-change"
            value={value}
            onChange={event =>
              event &&
              handleUpdateQuantity(record.id, {
                quantity: event,
                product_id: record?.Product?.id,
              })
            }
            min={1}
            max={100}
            step={1}
            keyboard={false}
            // formatter={value => `${value}%`}
            // parser={value => value.replace("%", "")}
          />
          <button
            className="btn-change"
            disabled={value >= 100}
            onClick={() =>
              handleUpdateQuantity(record.id, {
                quantity: value + 1,
                product_id: record?.Product?.id,
              })
            }
          >
            +
          </button>
        </InputChangeQuantity>
      ),
    },
    {
      title: `Tạm tính`,
      dataIndex: "total",
      key: "total",
      align: "left",
      width: 140,
      render: (value, record, index) => (
        <div className="d-flex align-items-center justify-content-space-between">
          <div className="d-flex flex-column">
            <strong style={{ color: "var(--color-brown-dark)" }}>
              {formatMoneyVND(record.quantity * record?.Product?.price)}
            </strong>
          </div>
          <ButtonCircle
            title="Xóa sản phẩm"
            iconName="cancel"
            placement="top"
            colorTooltip="var(--color-red-500)"
            onClick={() => {
              CB1({
                title: `Bạn có chắc chắn muốn xóa sản phẩm "${record?.Product?.name}" khỏi giỏ hàng không?`,
                icon: "trashRed",
                okText: "Đồng ý",
                onOk: () => {
                  handleDeleteProduct(record.id)
                },
              })
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <CartPageStyle>
      <LayoutCommon>
        <SpinCustom spinning={loading}>
          {openInfoOrder ? (
            <div
              className="fs-24 fw-600 mb-12 pointer"
              style={{ color: "var(--color-brown-dark)" }}
              onClick={() => setOpenInfoOrder(false)}
            >
              <ArrowLeftOutlined className="mr-12" />
              Giỏ hàng
            </div>
          ) : (
            <div
              className="fs-24 fw-600 mb-12"
              style={{ color: "var(--color-brown-dark)" }}
            >
              Danh sách sản phẩm
            </div>
          )}
          {openInfoOrder ? (
            <InfoOrder
              listProduct={listCart.map(i => ({ ...i, ...i.Product }))}
              userInfo={userInfo}
              totalMoney={totalMoney}
            />
          ) : (
            <Row gutter={[24, 24]}>
              <Col sx={24} lg={16} className="pb-16">
                <TableCustom
                  dataSource={listCart.map(i => ({
                    ...i,
                    total: i.so_luong ? i.so_luong * i.gia_ban : 0,
                  }))}
                  columns={columns}
                  sticky={{ offsetHeader: -12 }}
                  textEmpty="Không có dữ liệu"
                  // rowSelection={{
                  //   type: "checkbox",
                  //   preserveSelectedRowKeys: true,
                  //   selectedRowKeys: rowSelected?.map(i => i?.id),
                  //   onChange: (selectedRows, selectedRowKeys) => {
                  //     setRowSelected(selectedRowKeys)
                  //   },
                  // }}
                  pagination={false}
                  rowKey="id"
                  scroll={{ x: "600px", y: "calc(100vh - 240px)" }}
                />
              </Col>
              <Col
                xs={24}
                lg={8}
                style={{ borderLeft: "1px solid #ddd", height: "auto" }}
              >
                <div className="mb-24">
                  <div
                    className="fs-16 fw-600 pb-12 text-uppercase mb-12 d-flex align-items-flex-end"
                    style={{ borderBottom: "2px solid #ddd", height: 50 }}
                  >
                    CỘNG GIỎ HÀNG
                  </div>
                  <div
                    className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12"
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <div>Tạm tính</div>
                    <div
                      className="fw-600"
                      // style={{
                      //   color: "var(--color-orange)",
                      // }}
                    >
                      {formatMoneyVND(totalMoney)}
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12 fs-16"
                    style={{
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    <div className="fw-600">Tổng</div>
                    <div
                      className="fw-600"
                      style={{
                        color: "var(--color-orange)",
                      }}
                    >
                      {formatMoneyVND(totalMoney)}
                    </div>
                  </div>
                </div>
                <Button
                  btnType="orange"
                  className="w-100 d-flex align-items-center"
                  onClick={() => setOpenInfoOrder(true)}
                >
                  ĐẶT HÀNG NGAY <ArrowRightOutlined className="ml-16" />
                </Button>
              </Col>
            </Row>
          )}
        </SpinCustom>
      </LayoutCommon>
    </CartPageStyle>
  )
}

export default CartPage
