import { useLocation, useNavigate } from "react-router-dom"
import { AboutUsDetailStyle } from "../styled"
import { data } from "./data"
import LayoutCommon from "src/components/Common/Layout"
import { Col, Row } from "antd"
import ROUTER from "src/router"
import { useEffect } from "react"
const AboutUsDetail = () => {
  const id = useLocation().state.id
  const dataDetail = data.find(i => i.id === id)
  const navigate = useNavigate()
  useEffect(() => {
    window.scroll(0, 0)
  }, [id])
  return (
    <AboutUsDetailStyle>
      <img
        src={dataDetail?.img}
        alt=""
        width={"100%"}
        style={{ height: "80vh", objectFit: "cover" }}
      />
      <LayoutCommon>
        <Row gutter={24} className="pt-30 pb-20">
          <Col span={16} style={{ color: "var(--color-brown)" }}>
            <h1 className="fs-45 fw-600 mb-30">{dataDetail?.title}</h1>
            <div className="fs-18 mb-16">{dataDetail?.subtitle}</div>
            {dataDetail?.content?.map((i, idx) => (
              <div className="fs-14 mb-8" key={idx} style={{ lineHeight: 1.5 }}>
                {i}
              </div>
            ))}
            <div className="fw-600 mt-12">{dataDetail?.end}</div>
          </Col>
          <Col span={8}>
            {data
              ?.filter(i => i.id !== id)
              ?.map((i, idx) => (
                <div
                  className="other-item pointer"
                  key={idx}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    navigate(ROUTER.GIOI_THIEU_CHI_TIET, {
                      state: {
                        id: i.id,
                      },
                    })
                  }}
                >
                  <img
                    src={i.img}
                    alt=""
                    width={"100%"}
                    style={{
                      height: 250,
                      objectFit: "cover",
                      marginBottom: 24,
                    }}
                  />
                  <div className="title">{i.title}</div>
                </div>
              ))}
          </Col>
        </Row>
      </LayoutCommon>
    </AboutUsDetailStyle>
  )
}

export default AboutUsDetail
