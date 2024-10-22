import { Col, ConfigProvider, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { REQUEST_SUPPORT } from "src/constants/constants"
import { getRegexMobile } from "src/lib/stringsUtils"
import RequestSupportService from "src/services/RequestSupportService"

const { TextArea } = Input

const ModalAddRequest = ({ open, onCancel, onOk }) => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const isEdit = open?.isEdit

  useEffect(() => {
    if (isEdit)
      form.setFieldsValue({
        ...open,
      })
    else
      form.setFieldsValue({
        ho_ten: userInfo?.ho_ten,
        email: userInfo?.email,
        sdt: userInfo?.sdt,
        id_nguoi_dung: userInfo?.id,
      })
  }, [isEdit])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await RequestSupportService[
        isEdit ? "updateRequest" : "addRequest"
      ]({
        ...values,
        van_de_ht: !!values?.van_de_ht ? values?.van_de_ht : values?.khac,
        id_nguoi_dung: userInfo?.id,
        id: open?.id,
      })
      if (res?.isError) return
      Notice({
        msg: isEdit
          ? "Cập nhật thành công."
          : "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm với bạn.",
      })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button loading={loading} btnType="gray-style" onClick={onCancel}>
        Đóng
      </Button>
      <Button loading={loading} btnType="orange" onClick={() => onSubmit()}>
        Gửi
      </Button>
    </div>
  )

  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title={false}
      width={700}
    >
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#e67e22",
          },
        }}
      >
        <div className="title-page mb-10">Yêu cầu hỗ trợ</div>
        <Form form={form} layout="vertical">
          <Row>
            <Col md={24} xs={24} className="p-5">
              <Row gutter={[20, 8]}>
                <Col md={24} xs={24}>
                  <Form.Item
                    name="ho_ten"
                    label="Họ và Tên"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Họ và Tên" disabled />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    name="sdt"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                      {
                        pattern: getRegexMobile(),
                        message:
                          "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" disabled />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" disabled />
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
                            <TextArea
                              style={{
                                minHeight: 120,
                                overflow: "hidden auto",
                              }}
                              placeholder="Nhập nội dung"
                            />
                          </Form.Item>
                        )
                      }
                    }}
                  </Form.Item>
                </Col>
                {/* <Col md={24} xs={24}>
                <Form.Item
                  name="van_de_ht"
                  label="Nội dung"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống!",
                    },
                  ]}
                >
                  <TextArea placeholder="Nội dung" rows={4} />
                </Form.Item>
              </Col> */}
              </Row>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </CustomModal>
  )
}

export default ModalAddRequest
