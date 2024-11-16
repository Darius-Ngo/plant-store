import { Col, Form, Row } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { getRegexEmail, getRegexPassword } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"
import styled from "styled-components"
import { ModalLoginStyle, StyleLoginModal } from "../LoginModal/styled"
import useDeviceType from "src/lib/useDeviceType"

const ModalStyle = styled.div`
  .ant-input-search-button,
  .ant-btn-primary:not(:disabled):hover {
    color: #fff;
    background-color: #52c41a;
    display: flex;
    align-items: center;
    span {
      transform: translateY(-2px);
    }
  }
`

const RegisterModal = ({ open, handleCancel, handleLogin, handleOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { isMobile } = useDeviceType()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.register({
        ...values,
        ngay_sinh: values.ngay_sinh ? values.ngay_sinh.format() : undefined,
      })
      if (res?.isError) return
      Notice({
        msg: "Đăng ký tài khoản thành công!",
      })
      handleLogin()
      handleCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalLoginStyle
      title={false}
      width={500}
      footer={null}
      open={open}
      onCancel={handleCancel}
    >
      <ModalStyle>
        <SpinCustom spinning={loading}>
          <Row>
            <Col span={24}>
              <StyleLoginModal style={isMobile ? { padding: "24px 16px" } : {}}>
                <div className="text-center mb-30">
                  <div className="fs-24 fw-600">Đăng ký tài khoản</div>
                </div>
                <div>
                  <Form form={form} layout="vertical">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Họ tên không được để trống",
                            },
                          ]}
                        >
                          <FlInput label="Họ tên" isRequired />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
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
                          <FlInput label="Email" isRequired />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Mật khẩu không được để trống",
                            },
                            {
                              pattern: getRegexPassword(),
                              message:
                                "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                            },
                          ]}
                        >
                          <FlInput isPass label="Mật khẩu" isRequired />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Bạn chưa nhập lại mật khẩu mới!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  new Error("Mật khẩu nhập lại không khớp!"),
                                )
                              },
                            }),
                          ]}
                          name="RePassword"
                        >
                          <FlInput
                            isPass
                            isRequired
                            label="Nhập lại mật khẩu "
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div className="note fw-600">
                          Mật khẩu cần tuân thủ các quy tắc:
                        </div>
                        <div className="note">- Có ít nhất 8 ký tự.</div>
                        <div className="note">
                          - Có chứa từ 03 trong 04 loại ký tự sau: Chữ hoa (A,
                          B, C, …); Chữ thường (a, b, c, …); Ký tự đặc biệt (!,
                          @, #, …); Số (0,1,...9).
                        </div>
                        <div className="note mb-20">
                          - Không chứa khoảng trống
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        loading={loading}
                        btnType="orange"
                        className="btn-login"
                        onClick={handleSubmit}
                      >
                        Đăng ký
                      </Button>
                    </Row>
                  </Form>
                  <div className="mt-12 fs-16">
                    Đã có tài khoản{" "}
                    <i
                      className="pointer"
                      style={{ color: "rgb(36 118 226)" }}
                      onClick={() => {
                        handleCancel()
                        handleLogin()
                      }}
                    >
                      Đăng nhập
                    </i>{" "}
                    ngay.
                  </div>
                </div>
              </StyleLoginModal>
            </Col>
          </Row>
        </SpinCustom>
      </ModalStyle>
    </ModalLoginStyle>
  )
}

export default RegisterModal
