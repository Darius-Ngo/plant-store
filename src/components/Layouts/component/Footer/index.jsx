import { Col, Row } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import SvgIcon from "src/components/SvgIcon"
import { InfoContact } from "src/constants/constants"
import { FooterStyled } from "./styled"
import useDeviceType from "src/lib/useDeviceType"

const Footer = () => {
  const { isMobile } = useDeviceType()
  return (
    <FooterStyled>
      <div className="content-footer mt-30">
        <SvgIcon
          name="border-white-bt"
          style={{ transform: "rotate(180deg)", position: "relative", top: -1 }}
          className="mb-50"
        />
        <LayoutCommon>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={7}>
              <div className="fs-16 fw-600 text-uppercase mb-24">
                Thời gian hoạt động
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Ngày:</div>
                <div className="ml-8">Tất cả các ngày trong tuần</div>
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Giờ mở cửa:</div>
                <div className="ml-8">8:00 - 22:00</div>
              </div>
            </Col>
            <Col xs={24} lg={9}>
              <div className="fs-16 fw-600 text-uppercase mb-24">Liên hệ</div>

              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Số điện thoại:</div>
                <div className="ml-8">{InfoContact.phone}</div>
              </div>
              <div className="d-flex align-items-center mb-16">
                <div className="fw-600">Email:</div>
                <div className="ml-8">{InfoContact.email}</div>
              </div>
              <div className="d-flex align-items-flex-start mb-16">
                <div className="fw-600" style={{ whiteSpace: "nowrap" }}>
                  Địa chỉ:
                </div>
                <div className="ml-8">{InfoContact.address}</div>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6050419939!2d106.80891740003713!3d10.841506933782268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1730715827735!5m2!1svi!2s"
                width={"100%"}
                // height={200}
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </LayoutCommon>
      </div>
      <div className={`end-page ${isMobile ? "fs-12" : ""}`}>
        © 2024 Bản quyền thuộc về NGUYỄN PHÚC HẢI FPT
      </div>
    </FooterStyled>
  )
}

export default Footer
