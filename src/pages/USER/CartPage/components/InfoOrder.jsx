import { Col, ConfigProvider, Form, Image, Radio, Row } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { getRegexPhoneNumber } from "src/lib/stringsUtils"
import { formatMoneyVND } from "src/lib/utils"
import { setListCart } from "src/redux/appGlobal"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import OrderService from "src/services/OrderService"
import { InfoOrderStyle } from "../styled"

const InfoOrder = ({ listProduct, userInfo, totalMoney }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [typePay, setTypePay] = useState("COD")
  const [shipping_fee, setShippingFee] = useState(25000)

  const getListCart = async user_id => {
    try {
      setLoading(true)
      const res = await CartService.getListCart(user_id)
      dispatch(setListCart(res.data || []))
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async order_id => {
    try {
      setLoading(true)
      const res = await OrderService.paymentsOrder({
        order_id,
        callbackUrl: `${window.location.origin}/${ROUTER.DS_DON_DAT_HANG}`,
      })
      if (!res?.data) return
      window.open(res?.data?.url)
    } finally {
      setLoading(false)
    }
  }
  const handleOrder = async () => {
    try {
      setLoading(true)
      const data = await form.validateFields()
      const res = await OrderService.addOrder({
        ...data,
        user_id: userInfo.id,
        payment_method: typePay,
        shipping_fee: shipping_fee,
      })
      if (!res?.data) return
      Notice({
        msg: res?.data?.message || "Đặt hàng thành công.",
      })
      if (typePay === "bank_transfer") {
        await handlePayment(res?.data?.order?.id)
        await getListCart(userInfo.id)
      } else {
        await getListCart(userInfo.id)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      user_name: userInfo.username,
      user_phone: userInfo.phone,
      shipping_address: userInfo.address,
    })
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <InfoOrderStyle>
        <Form layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={16} className="pb-16">
              <div
                className="fs-16 fw-600 mb-16 pb-12 text-uppercase d-flex justify-content-space-between align-items-flex-end"
                style={{ borderBottom: "2px solid #ddd" }}
              >
                Thông tin đặt hàng
              </div>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="fw-600 mb-12">Thông tin người nhận</div>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Tên người nhận không được để trống!",
                      },
                    ]}
                    name={"user_name"}
                  >
                    <FlInput label="Tên người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "SĐT người nhận không được để trống!",
                      },
                      {
                        pattern: getRegexPhoneNumber(),
                        message: "Số điện thoại sai định dạng",
                      },
                    ]}
                    name={"user_phone"}
                  >
                    <FlInput label="SĐT người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Địa chỉ nhận hàng</div>
                </Col>
                <Col span={24}></Col>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ nhận hàng không được để trống!",
                      },
                    ]}
                    name={"shipping_address"}
                  >
                    <FlInput label="Địa chỉ nhận hàng" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Ghi chú cho cửa hàng</div>
                </Col>
                <Col span={24}>
                  <Form.Item name={"note"}>
                    <FlInput textArea label="Ghi chú" style={{ height: 120 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              span={8}
              style={{ borderLeft: "1px solid #ddd", height: "auto" }}
            >
              <div className="mb-24">
                <div
                  className="fs-14 fw-600 pb-12 pr-16 text-uppercase mb-12 d-flex align-items-flex-end justify-content-space-between"
                  style={{ borderBottom: "2px solid #ddd", height: 50 }}
                >
                  <span>SẢN PHẨM</span>
                  <span>GIÁ</span>
                </div>
                {listProduct.map(i => (
                  <div
                    className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-6 pr-12"
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <div className="d-flex align-items-flex-end">
                      <Image
                        src={i?.imageUrl}
                        width={50}
                        alt={""}
                        preview={false}
                      />
                      <div>
                        <div
                          style={{ color: "var(--color-brown-dark)" }}
                          className="fw-600 fs-13"
                        >
                          {i.name}
                        </div>
                        <div
                          className="fs-11 mt-4"
                          style={{ color: "var(--color-yellow)" }}
                        >
                          <span className="fs-13">x{i.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="fw-600"
                      style={{
                        color: "var(--color-yellow)",
                      }}
                    >
                      {formatMoneyVND(i.quantity * i.price)}
                    </div>
                  </div>
                ))}
                <div
                  className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12"
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div
                    className="fw-600"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    Phí ship
                  </div>
                  <div
                    className="fw-600"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    {formatMoneyVND(shipping_fee)}
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
                    {formatMoneyVND(totalMoney + shipping_fee)}
                  </div>
                </div>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      colorPrimary: "var(--color-orange)",
                    },
                  },
                }}
              >
                <Radio.Group
                  onChange={e => setTypePay(e.target.value)}
                  value={typePay}
                  className="radio-user mb-12"
                >
                  <Radio value={"COD"}>Thanh toán khi nhận hàng</Radio>
                  <Radio value={"bank_transfer"}>Thanh toán trực tuyến</Radio>
                </Radio.Group>
              </ConfigProvider>
              <Button
                btnType="orange"
                className="w-100 d-flex align-items-center"
                onClick={handleOrder}
              >
                ĐẶT HÀNG
              </Button>
            </Col>
          </Row>
        </Form>
      </InfoOrderStyle>
    </SpinCustom>
  )
}

export default InfoOrder
