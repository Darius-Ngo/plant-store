import { Form, Row, Spin } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexPassword } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"
import styled from "styled-components"

const StyleChangePassword = styled.div`
  /* min-height: calc(100vh - 155px); */
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  .content-wrap {
    margin-top: 10px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);
    padding: 40px 50px;
    width: 500px;
    height: fit-content;
  }
  .btn-login {
    width: 100%;
  }
  .title-form {
    text-transform: uppercase;
    color: var(--color-orange);
  }
  .border-right-form {
    border-right: 2px solid var(--color-orange);
  }
  .note {
    color: rgba(0, 0, 0, 0.49);
    margin-bottom: 4px;
    font-size: 13px;
  }
`

const ChangePasswordModal = ({ onCancel, open }) => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.changePassword({
        // id: userInfo.id,
        ...values,
      })
      if (res.isError) return
      Notice({
        isSuccess: true,
        msg: "Cập nhật mật khẩu thành công!",
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={false}
      footer={false}
      width={500}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <StyleChangePassword>
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="title-page text-center mb-30">
              <div className="fs-22 fw-600 ">Đổi mật khẩu</div>
            </div>
            <div className="pl-20 pr-20">
              <Form form={form} layout="vertical">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập mật khẩu cũ!",
                    },
                  ]}
                  name="oldPassword"
                >
                  <FlInput isPass isRequired label="Mật khẩu hiện tại" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập mật khẩu mới!",
                    },
                    {
                      pattern: getRegexPassword(),
                      message:
                        "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                    },
                  ]}
                  name="newPassword"
                >
                  <FlInput isPass isRequired label="Mật khẩu mới" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập lại mật khẩu mới!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            "Mật khẩu nhập lại phải giống với mật khẩu mới!",
                          ),
                        )
                      },
                    }),
                  ]}
                  name="ReNewPassword"
                >
                  <FlInput isPass isRequired label="Nhập lại mật khẩu " />
                </Form.Item>
                <div className="note">Mật khẩu cần tuân thủ các quy tắc:</div>
                <div className="note">Có ít nhất 8 ký tự.</div>
                <div className="note">
                  Có chứa từ 03 trong 04 loại ký tự sau: Chữ hoa (A, B, C, …);
                  Chữ thường (a, b, c, …); Ký tự đặc biệt (!, @, #, …); Số
                  (0,1,...9).
                </div>
                <div className="note mb-20">Không chứa khoảng trống</div>
                <Row>
                  <Button
                    loading={loading}
                    btnType="orange"
                    className="btn-login mt-10"
                    type="submit"
                    htmlType="submit"
                    onClick={handleSubmit}
                  >
                    Lưu lại
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </StyleChangePassword>
      </Spin>
    </CustomModal>
  )
}

export default ChangePasswordModal
