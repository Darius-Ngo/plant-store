import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Col, ConfigProvider, Form, Radio, Row, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import OrderService from "src/services/OrderService"

const CancelOrder = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { userInfo } = useSelector(state => state.appGlobal)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await OrderService.updateStatus({
        id: open.id,
        trang_thai: open.chuyen_tt,
        ly_do_huy_don: !!values?.reasonSelect
          ? values?.reasonSelect
          : values?.reasonInput,
        id_nguoi_cap_nhat: userInfo.id,
      })
      if (res?.isError) return
      Notice({
        msg: "Hủy đơn thành công.",
      })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const listReason = [
    "Muốn nhập/thay đổi mã Voucher",
    "Muốn thay đổi sản phẩm trong đơn (size, số lượng,...)",
    "Thủ tục thanh toán quá rắc rối",
    "Tìm thấy giá rẻ hơn ở chỗ khác",
    "Đổi ý, không muốn mua nữa",
  ]
  return (
    <CustomModal
      title={false}
      open={open}
      width={720}
      onCancel={onCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onCancel} btnType="orange-third">
            Đóng
          </Button>
          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
            btnType="orange"
          >
            Xác nhận
          </Button>
        </div>
      }
    >
      <Spin spinning={loading}>
        <div
          className="fs-16 fw-600 mb-16 text-center"
          style={{
            color: "var(--color-red-500)",
          }}
        >
          Hủy đơn hàng "{open?.ma_don_hang}"
        </div>
        <div
          className="p-16 mt-16 mb-16"
          style={{
            background: "#FFFDE5",
            color: "var(--color-orange)",
          }}
        >
          <div className="fw-600 d-flex">
            <ExclamationCircleOutlined
              className="mr-8"
              style={{ color: "var(--color-orange)" }}
            />
            {/* <SvgIcon name="t_warning_default" />{" "} */}
            <span>Vui lòng chọn lý do hủy đơn.</span>
          </div>
          <div>
            Lưu ý: Thao tác này sẽ hủy tất cả sản phẩm trong đơn và không thể
            hoàn tác !
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
          <Form form={form} layout="vertical">
            <Row gutter={[16]}>
              <Col span={24}>
                <Form.Item
                  name="reasonSelect"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn lý do hủy đơn!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      {listReason.map(i => (
                        <Radio value={i}>{i}</Radio>
                      ))}
                      <Radio value={0}>Lý do khác.</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    if (getFieldValue("reasonSelect") === 0) {
                      return (
                        <Form.Item
                          name="reasonInput"
                          rules={[
                            {
                              required: true,
                              message: "Lý do hủy đơn không được để trống!",
                            },
                          ]}
                        >
                          <FlInput label="Nhập lý do" isRequired />
                        </Form.Item>
                      )
                    }
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Spin>
    </CustomModal>
  )
}

export default CancelOrder
