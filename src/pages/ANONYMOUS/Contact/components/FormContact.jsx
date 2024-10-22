import { Col, Form, Input, Row, Select } from "antd"
import { useState } from "react"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import RequestSupportService from "src/services/RequestSupportService"
import { FormContactStyled } from "../styled"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import STORAGE, { getStorage } from "src/lib/storage"
import { REQUEST_SUPPORT } from "src/constants/constants"

const FormContact = () => {
  const [form] = Form.useForm()
  const isLogin = getStorage(STORAGE.TOKEN)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await RequestSupportService.addRequest({
        ...values,
        id_nguoi_dung: isLogin ? userInfo?.id : undefined,
        van_de_ht: !!values?.van_de_ht ? values?.van_de_ht : values?.khac,
      })
      if (res?.isError) return
      Notice({
        msg: "Gửi yêu cầu thành công! Chúng tôi sẽ phản hồi sớm với bạn.",
      })
      form.resetFields()
      if (isLogin)
        form.setFieldsValue({
          ho_ten: userInfo?.ho_ten,
          sdt: userInfo?.sdt,
          email: userInfo?.email,
        })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogin)
      form.setFieldsValue({
        ho_ten: userInfo?.ho_ten,
        sdt: userInfo?.sdt,
        email: userInfo?.email,
      })
  }, [isLogin])

  return (
    <FormContactStyled>
      <div className="form-contact-box">
        <div className="title-page mb-8 fs-16">Gửi yêu cầu hỗ trợ</div>
        <SpinCustom spinning={loading}>
          <Form form={form} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24}>
                <Form.Item
                  name="ho_ten"
                  label="Họ và tên"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ tên" disabled={!!isLogin} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  required
                  name="sdt"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexMobile(),
                      message: "Số điện thoại sại định dạng",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    disabled={!!isLogin}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexEmail(),
                      message: "Email không đúng định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập " disabled={!!isLogin} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Nội dung"
                  name="van_de_ht"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn nội dung cần hỗ trợ!",
                    },
                  ]}
                >
                  <Select placeholder="--Chọn--">
                    {REQUEST_SUPPORT.map(i => (
                      <Select.Option value={i}>{i}</Select.Option>
                    ))}
                    <Select.Option value={0}>Nội dung khác.</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    if (getFieldValue("van_de_ht") === 0) {
                      return (
                        <Form.Item
                          name="khac"
                          rules={[
                            {
                              required: true,
                              message: "Nội dung không được để trống!",
                            },
                          ]}
                        >
                          <Input.TextArea
                            style={{ minHeight: 120, overflow: "hidden auto" }}
                            placeholder="Nhập nội dung"
                          />
                        </Form.Item>
                      )
                    }
                  }}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  btnType="linear"
                  className="form-contact-submit hover-shadow"
                  onClick={onSubmit}
                >
                  Gửi
                </Button>
              </Col>
            </Row>
          </Form>
        </SpinCustom>
      </div>
    </FormContactStyled>
  )
}

export default FormContact
