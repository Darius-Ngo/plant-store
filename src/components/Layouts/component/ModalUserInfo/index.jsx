import { UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Row, Space } from "antd"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import { GENDER_LIST, ROLE_LIST } from "src/constants/constants"
import { ModalInfoStyle } from "./styled"
import { useState } from "react"
import ModalChangeInfo from "./components/ModalChangeInfo"

const ModalUserInfo = ({ open, onCancel, handleChangePass }) => {
  const { userInfo } = useSelector(state => state.appGlobal)
  console.log('userInfo: ', userInfo);
  const [openModalChange, setOpenModalChange] = useState(false)
  return (
    <ModalInfoStyle
      title={false}
      width={900}
      footer={
        <Space size={12} className="justify-content-flex-end pr-16 pb-10">
          <Button
            btnType="orange-third"
            // onClick={() => setOpenModalChange(userInfo)}
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
      <Row gutter={24}>
        <Col span={7}>
          <div className="d-flex align-items-center justify-content-center mt-50">
            <Avatar
              size={190}
              icon={<UserOutlined />}
              src={userInfo?.avatar}
              style={{ border: "1px solid #ddd" }}
            />
          </div>
        </Col>
        <Col span={17}>
          <Row gutter={[16, 24]} className="">
            <Col span={24}>
              <div className=" title-page">Thông tin tài khoản</div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Họ tên:</div>
                <div className="ml-8">{userInfo?.username}</div>
              </div>
            </Col>

            {/* <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Tên nhân viên:</div>
                <div className="ml-8">{userInfo?.ho_ten}</div>
              </div>
            </Col> */}

            {/* <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Giới tính:</div>
                <div className="ml-8">
                  {GENDER_LIST.find(i => i.value === userInfo?.gioi_tinh).label}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Ngày sinh:</div>
                <div className="ml-8">
                  {userInfo?.ngay_sinh
                    ? dayjs(userInfo?.ngay_sinh).format("DD/MM/YYYY")
                    : ""}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Số điện thoại:</div>
                <div className="ml-8">{userInfo?.sdt}</div>
              </div>
            </Col> */}
            <Col span={12}>
              <div className="d-flex align-items-center justify-content-flex-start fs-16">
                <div className="fw-600">Email:</div>
                <div className="ml-8">{userInfo?.email}</div>
              </div>
            </Col>
            {userInfo?.cccd && (
              <>
                <Col span={12}>
                  <div className="d-flex align-items-center justify-content-flex-start fs-16">
                    <div className="fw-600">Số CCCD:</div>
                    <div className="ml-8">{userInfo?.cccd}</div>
                  </div>
                </Col>
                {/* <Col span={12}>
                  <div className="d-flex align-items-center justify-content-flex-start fs-16">
                    <div className="fw-600">Phân quyền:</div>
                    <div className="ml-8">
                      {
                        ROLE_LIST.find(i => i.value === userInfo?.id_phan_quyen)
                          .label
                      }
                    </div>
                  </div>
                </Col> */}
              </>
            )}
            {/* <Col span={24}>
              <div className="d-flex align-items-flex-start justify-content-flex-start fs-16">
                <div className="fw-600" style={{ whiteSpace: "nowrap" }}>
                  Địa chỉ:
                </div>
                <div className="ml-8">{userInfo?.dia_chi}</div>
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
      {openModalChange && (
        <ModalChangeInfo
          open={openModalChange}
          onCancel={() => setOpenModalChange(false)}
        />
      )}
    </ModalInfoStyle>
  )
}

export default ModalUserInfo
