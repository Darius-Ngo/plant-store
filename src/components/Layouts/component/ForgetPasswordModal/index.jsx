import { Form, Modal, Row, Spin } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexEmail } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"
import styled from "styled-components"

const ModalStyle = styled(Modal)`
  .ant-modal-close {
    svg path {
      fill: #333 !important;
    }
  }
`

const ForgetPasswordModal = ({ onCancel, open }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [isOTP, setIsOTP] = useState(false)
  const handleSendEmail = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.forgetPassWord({
        ...values,
      })
      if (res.isError) return
      setIsOTP(true)
      Notice({
        msg: "Vui lòng kiểm tra Email!",
      })
    } finally {
      setLoading(false)
    }
  }
  const handleConfirm = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.confirmOTP({
        ...values,
      })
      if (res.isError) return
      Notice({
        isSuccess: true,
        msg: "Mật khẩu mới đã được gửi về Email của bạn!",
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  return (
    <ModalStyle
      title={false}
      footer={false}
      width={500}
      open={open}
      onCancel={onCancel}
      maskClosable={false}
    >
      <Spin spinning={loading}>
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="title-page text-center mb-12">
            <div className="fs-22 fw-600 ">Quên mật khẩu</div>
          </div>
          <div className="pl-20 pr-20">
            <div className="fs-14 text-center mb-16">
              {isOTP
                ? "Nhập Mã OTP xác nhận"
                : "Nhập email đã đăng ký để được hỗ trợ lấy lại mật khẩu"}
            </div>
            <Form form={form} layout="vertical">
              {isOTP ? (
                <Form.Item
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Mã OTP không được để trống",
                    },
                  ]}
                >
                  <FlInput label="Nhập OTP" isRequired />
                </Form.Item>
              ) : (
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email không được để trống",
                    },
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <FlInput label="Nhập Email" isRequired />
                </Form.Item>
              )}

              <Row>
                {isOTP ? (
                  <Button
                    loading={loading}
                    btnType="orange"
                    className="btn-login mt-10 w-100"
                    type="submit"
                    htmlType="submit"
                    onClick={handleConfirm}
                  >
                    Xác nhận OTP
                  </Button>
                ) : (
                  <Button
                    loading={loading}
                    btnType="orange"
                    className="btn-login mt-10 w-100"
                    type="submit"
                    htmlType="submit"
                    onClick={handleSendEmail}
                  >
                    Xác nhận
                  </Button>
                )}
              </Row>
            </Form>
          </div>
        </div>
      </Spin>
    </ModalStyle>
  )
}

export default ForgetPasswordModal
