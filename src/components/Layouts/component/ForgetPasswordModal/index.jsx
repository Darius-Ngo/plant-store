import { Form, Modal, Row } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
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
  const handleSendEmail = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.forgotPassword({
        ...values,
      })
      if (res.isError) return
      Notice({
        msg: "Vui lòng kiểm tra Email!",
      })
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
      <SpinCustom spinning={loading}>
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="title-page text-center mb-12">
            <div className="fs-22 fw-600 ">Quên mật khẩu</div>
          </div>
          <div className="pl-20 pr-20">
            <div className="fs-14 text-center mb-16">
              Nhập email đã đăng ký để được hỗ trợ lấy lại mật khẩu
            </div>
            <Form form={form} layout="vertical">
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
              <Row>
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
              </Row>
            </Form>
          </div>
        </div>
      </SpinCustom>
    </ModalStyle>
  )
}

export default ForgetPasswordModal
