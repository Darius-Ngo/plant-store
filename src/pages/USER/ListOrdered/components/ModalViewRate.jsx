import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons"
import { Divider, Image, Rate, Row, Skeleton, Tooltip } from "antd"
import { useEffect, useState } from "react"
// import ReactPlayer from "react-player"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import { FAILBACK, SIZE_PRODUCT } from "src/constants/constants"
import RateService from "src/services/RateService"
import { RateStyled } from "../styled"

const ModalViewRate = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [listRate, setListRate] = useState([])

  const customIcons = {
    1: (
      <Tooltip title="Rất tệ" color="yellow" mouseLeaveDelay={0}>
        <FrownOutlined />
      </Tooltip>
    ),
    2: (
      <Tooltip title="Tệ" color="yellow" mouseLeaveDelay={0}>
        <FrownOutlined />
      </Tooltip>
    ),
    3: (
      <Tooltip title="Bình thường" color="yellow" mouseLeaveDelay={0}>
        <MehOutlined />
      </Tooltip>
    ),
    4: (
      <Tooltip title="Tốt" color="yellow" mouseLeaveDelay={0}>
        <SmileOutlined />
      </Tooltip>
    ),
    5: (
      <Tooltip title="Tuyệt vời" color="yellow" mouseLeaveDelay={0}>
        <SmileOutlined />
      </Tooltip>
    ),
  }

  useEffect(() => {
    if (open) getDetailRate()
  }, [open])

  const getDetailRate = async () => {
    try {
      setLoading(true)
      const res = await RateService.getDetailRate({
        id_don_hang: open.id,
      })
      if (res.isError) return
      setListRate(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="gray-style" onClick={onCancel}>
        Đóng
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={false}
      open={!!open}
      onCancel={onCancel}
      footer={renderFooter()}
      width={800}
    >
      <SpinCustom spinning={loading}>
        <div className="title-page mb-8">Xem đánh giá</div>
        {listRate?.map((i, idx) => {
          return (
            <RateStyled key={i.id}>
              <div className="d-flex align-items-center">
                <img
                  alt=""
                  src={i?.anh}
                  width="60px"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <div
                    className="fw-600 max-line1"
                    style={{ color: "var(--color-brown)" }}
                    title={i?.ten_san_pham}
                  >
                    {i?.ten_san_pham}
                  </div>
                  <div className="">{SIZE_PRODUCT[i?.kich_co_sp]}</div>
                </div>
              </div>
              <div className="ml-12">
                <Rate
                  // allowHalf
                  disabled
                  value={i?.danh_gia}
                  character={({ index }) => customIcons[index + 1]}
                />
                <div className="d-flex">
                  <div className="fw-600 mr-8">Nhận xét: </div>
                  <div>{i?.noi_dung}</div>
                </div>
                <Row
                  gutter={24}
                  style={{
                    flexWrap: "nowrap",
                    overflow: "auto",
                    marginTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Image.PreviewGroup>
                    {i?.anh_mo_ta?.map((img, idx) => (
                      <div className="image-css mr-8" key={idx}>
                        <Image
                          width={100}
                          src={`${process.env.REACT_APP_API_ROOT}/${img}`}
                          alt="Ảnh"
                          fallback={FAILBACK}
                          placeholder={
                            <Skeleton.Image width={100} active={true} />
                          }
                        />
                      </div>
                    ))}
                  </Image.PreviewGroup>
                  {/* {i?.video_mo_ta?.map((img, idx) => (
                    <div className="image-css mr-8" key={idx}>
                      <ReactPlayer
                        url={`${process.env.REACT_APP_API_ROOT}/${img}`}
                        width="100px"
                        height="100px"
                        playing={false}
                        controls={true}
                      />
                    </div>
                  ))} */}
                </Row>
              </div>
              {idx !== listRate.length - 1 && <Divider />}
            </RateStyled>
          )
        })}
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalViewRate
