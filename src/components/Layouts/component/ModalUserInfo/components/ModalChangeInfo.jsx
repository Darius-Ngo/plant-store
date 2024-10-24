import { Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexEmail, getRegexPhoneNumber } from "src/lib/stringsUtils"
import styled from "styled-components"
// import { ButtonUploadStyle } from "src/pages/ADMIN/EmployeeManager/styled"
import { useDispatch } from "react-redux"
import SpinCustom from "src/components/Spin"
import STORAGE, { setStorage } from "src/lib/storage"
import { setUserInfo } from "src/redux/appGlobal"
import AuthService from "src/services/AuthService"
const { Option } = Select
const Styled = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    width: unset;
    height: unset;
    background-color: unset;
    border: unset;
  }
  .ant-upload-list {
    align-items: center;
    display: flex;
  }
`
const ModalChangeInfo = ({ onOk, open, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    form.setFieldsValue({
      ...open,
    })
  }, [open])

  const handleSave = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let urlAvatar = ""
      if (values?.avatar?.length && values?.avatar[0]?.originFileObj) {
        const formData = new FormData()
        values?.avatar?.map(img => formData.append("file", img?.originFileObj))
      } else {
        if (!!values?.avatar) urlAvatar = values?.avatar[0]?.url
      }
      const body = {
        ...open,
        ...values,
        avatar: urlAvatar,
        ngay_sinh: values.ngay_sinh
          ? values.ngay_sinh.format("YYYY-MM-DD")
          : null,
        id: open.id,
      }
      const res = await AuthService.updateUserInfo(body)
      if (res?.isError) return
      Notice({
        msg: `Cập nhật thông tin thành công!`,
      })
      setStorage(STORAGE.USER_INFO, body)
      dispatch(setUserInfo(body))
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="gray-style" onClick={onCancel}>
        Đóng
      </Button>
      <Button
        btnType="orange"
        className="btn-hover-shadow"
        onClick={handleSave}
      >
        Lưu lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={false}
      footer={renderFooter()}
      width={700}
      open={open}
      onCancel={onCancel}
    >
      <SpinCustom spinning={loading}>
        <Styled>
          <div className="title-page mb-12">Cập nhật thông tin</div>
          <Form form={form} layout="vertical">
            <Row gutter={[16]}>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  required
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Họ và tên không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống",
                    },
                    {
                      pattern: getRegexPhoneNumber(),
                      message: "Số điện thoại sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Styled>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalChangeInfo
