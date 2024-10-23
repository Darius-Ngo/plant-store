import { UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Row, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import ModalChangeInfo from "./components/ModalChangeInfo"
import { ModalInfoStyle } from "./styled"
import AuthService from "src/services/AuthService"
import { setUserInfo } from "src/redux/appGlobal"
import STORAGE, { setStorage } from "src/lib/storage"

const ModalUserInfo = ({ open, onCancel, handleChangePass }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.appGlobal)
  console.log('userInfo: ', userInfo);
  const [loading, setLoading] = useState(false)
  const [openModalChange, setOpenModalChange] = useState(false)
  
  const getUserInfo = async () => {
    try {
      setLoading(true)
      const res = await AuthService.getUserInfo()
      dispatch(setUserInfo(res?.data || {}))
      setStorage(STORAGE.USER_INFO, res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])
  
  return (
    <ModalInfoStyle
      title={false}
      width={600}
      footer={
        <Space size={12} className="justify-content-flex-end pr-16 pb-10">
          <Button
            btnType="orange-third"
            onClick={() => setOpenModalChange(userInfo)}
          >
            Cập nhật thông tin
          </Button>
          <Button btnType="orange-third" onClick={handleChangePass}>
            Đổi mật khẩu
          </Button>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      style={{ top: 20 }}
    >
      <Spin spinning={loading}>
      <Row gutter={24}>
        {/* <Col span={7}>
          <div className="d-flex align-items-center justify-content-center mt-50">
            <Avatar
              size={190}
              icon={<UserOutlined />}
              src={userInfo?.avatar}
              style={{ border: "1px solid #ddd" }}
            />
          </div>
        </Col> */}
        <Col span={24}>
          <Row gutter={[16, 24]} className="">
            <Col span={24}>
              <div className=" title-page">Thông tin tài khoản</div>
            </Col>
            <Col span={24}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Họ tên:</div>
                <div className="ml-8">{userInfo?.username}</div>
              </div>
            </Col>
            <Col span={24}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Email:</div>
                <div className="ml-8">{userInfo?.email}</div>
              </div>
            </Col>
            <Col span={24}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Số điện thoại:</div>
                <div className="ml-8">{userInfo?.phone}</div>
              </div>
            </Col>
            <Col span={24}>
              <div className="d-flex align-items-flex-start justify-content-flex-start fs-16">
                <div className="fw-600" style={{ whiteSpace: "nowrap" }}>
                  Địa chỉ:
                </div>
                <div className="ml-8">{userInfo?.address}</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      </Spin>
      {openModalChange && (
        <ModalChangeInfo
          open={openModalChange}
          onCancel={() => setOpenModalChange(false)}
          onOk={() => getUserInfo()}
        />
      )}
    </ModalInfoStyle>
  )
}

export default ModalUserInfo
