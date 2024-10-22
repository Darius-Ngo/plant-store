import { Col, Form, Radio, Row, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import { getRegexPhoneNumber } from "src/lib/stringsUtils"
import OrderService from "src/services/OrderService"

const ModalAddNewAddress = ({ open, onCancel, onOk, userInfo }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const isEdit = open.isEdit
  const addAddress = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res = await OrderService[isEdit ? "updateAddress" : "addAddress"]({
        ...values,
        id_nguoi_dung: userInfo.id,
        id: open.id,
      })
      if (res.isError) return
      Notice({
        msg: isEdit
          ? "Cập nhật thông tin thành công."
          : "Thêm địa mới thành công.",
      })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (isEdit) form.setFieldsValue(open)
  }, [isEdit])
  return (
    <CustomModal
      title={isEdit ? "Cập nhật thông tin địa chỉ" : "Thêm địa chỉ đặt hàng"}
      width={700}
      isUser
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button btnType="gray-style" onClick={onCancel}>
            Đóng
          </Button>
          <Button btnType="orange" onClick={addAddress}>
            Ghi lại
          </Button>
        </div>
      }
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form layout="vertical" form={form}>
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
                name={"ten_nguoi_nhan"}
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
                name={"sdt_nguoi_nhan"}
              >
                <FlInput label="SĐT người nhận" isRequired />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="fw-600 mb-12">Địa chỉ nhận hàng</div>
            </Col>
            <Col span={24}>
              <SelectAddress
                floating={true}
                form={form}
                required
                initValue={
                  isEdit
                    ? {
                        id_tp: open?.id_tp,
                        id_qh: open?.id_qh,
                        id_xp: open?.id_xp,
                      }
                    : {}
                }
                listFormName={["id_tp", "id_qh", "id_xp"]}
              />
            </Col>
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ chi tiết không được để trống!",
                  },
                ]}
                name={"dia_chi_chi_tiet"}
              >
                <FlInput label="Địa chỉ chi tiết" isRequired />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default ModalAddNewAddress
