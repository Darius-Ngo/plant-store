import { Col, Image, Row } from "antd"
import { useNavigate } from "react-router-dom"
import LayoutCommon from "src/components/Common/Layout"
import { NewsStyle } from "../styled"
import { FAILBACK } from "src/constants/constants"
import SvgIcon from "src/components/SvgIcon"
import dayjs from "dayjs"
import { ArrowRightOutlined } from "@ant-design/icons"
import ROUTER from "src/router"

const News = ({ listPost }) => {
  const navigate = useNavigate()
  return (
    <>
      <NewsStyle>
        <LayoutCommon>
          <div className="title-home">Tin tức mới nhất</div>
          <Row gutter={36} className="mt-30 mb-30">
            {listPost?.map(i => (
              <Col span={8} key={i?.id}>
                <div className="news-item">
                  <Image
                    preview={false}
                    src={i?.anh_mo_ta}
                    fallback={FAILBACK}
                    className="pointer img-news"
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      navigate(ROUTER.CHI_TIET_TIN_TUC, {
                        state: i,
                      })
                    }}
                  />
                  <div
                    className="fs-16 fw-600 max-line1 title-news pointer"
                    title={i?.tieu_de}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      navigate(ROUTER.CHI_TIET_TIN_TUC, {
                        state: i,
                      })
                    }}
                  >
                    {i?.tieu_de}
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-flex-end mr-12">
                      <SvgIcon name="calendar" className="mr-5" />
                      <div className="time mr-8">
                        {i?.ngay_dang
                          ? dayjs(i?.ngay_dang).format("HH:MM DD/MM/YYYY")
                          : ""}
                      </div>
                    </div>
                    <div className="d-flex mr-12 align-items-flex-end">
                      <SvgIcon name="mode-comment" className="mr-5" />
                      <div className="number-comment ">{i?.luot_bl}</div>
                    </div>
                    <div className="d-flex align-items-flex-end">
                      <SvgIcon name="view" className="mr-5" />
                      <div className="number-comment">{i?.luot_xem}</div>
                    </div>
                  </div>
                  <div
                    className={`max-line4 mt-12`}
                    style={{ lineHeight: 1.5 }}
                  >
                    {i?.tom_tat}
                  </div>
                  <div
                    className="see-more d-flex align-items-center"
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      navigate(ROUTER.CHI_TIET_TIN_TUC, {
                        state: i,
                      })
                    }}
                  >
                    Đọc thêm <ArrowRightOutlined className="ml-8" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </LayoutCommon>
      </NewsStyle>
      <SvgIcon name="border" style={{ transform: "rotate(180deg)" }} />
    </>
  )
}
export default News
