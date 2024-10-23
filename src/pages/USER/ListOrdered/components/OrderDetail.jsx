import { Col, Divider, Row, Space, Spin, Steps } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import SvgIcon from "src/components/SvgIcon"
import { formatMoneyVND } from "src/lib/utils"
import OrderServices from "src/services/OrderService"
import { ModalOrderDetail, OrderDetailStyled, StepsStyled } from "../styled"
// import Vote from "./Vote"
import {
  COLOR_STATUS_ORDER,
  PAYMENT_TYPE,
  SIZE_PRODUCT,
} from "src/constants/constants"

const { Step } = Steps

const OrderDetail = ({ detail, open, onCancel, setBtn }) => {
  const [loading, setLoading] = useState(false)
  const [detailUpdate, setDetailUpdate] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  const getDetailUpdate = async () => {
    try {
      setLoading(true)
      const res = await OrderServices.getDetailUpdate({
        id_don_hang: detail?.id,
      })
      if (res?.isError) return
      setDetailUpdate(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (detail) {
      getDetailUpdate()
      if (detail.da_danh_gia) return setCurrentStep(4)
      switch (detail.trang_thai) {
        case 1:
          return setCurrentStep(0)
        case 2:
        case 6:
          return setCurrentStep(1)
        case 3:
          return setCurrentStep(2)
        case 4:
          return setCurrentStep(3)
        default:
          return setCurrentStep(0)
      }
    }
  }, [detail])
  const formatTime = value =>
    value ? moment(value).format("HH:mm DD/MM/YYYY") : ""

  const isCancel = detail.trang_thai === 6
  const items = isCancel
    ? [
        {
          title: "Chờ xác nhận",
          description: formatTime(detail?.thoi_gian_dat),
          icon: (
            <SvgIcon
              name={currentStep === 0 ? "order-step1-active" : "order-step1"}
            />
          ),
        },
        {
          title: "Đã hủy đơn",
          description: formatTime(
            detailUpdate?.find(i => i?.trang_thai === 6)?.thoi_gian_cap_nhat,
          ),
          icon: <SvgIcon name="order-step0" />,
        },
      ]
    : [
        {
          title: "Chờ xác nhận",
          description: formatTime(detail?.thoi_gian_dat),
          icon: (
            <SvgIcon
              name={currentStep === 0 ? "order-step1-active" : "order-step1"}
            />
          ),
        },
        {
          title: "Chờ vận chuyển",
          description: formatTime(
            detailUpdate?.find(i => i?.trang_thai === 2)?.thoi_gian_cap_nhat,
          ),
          icon: (
            <SvgIcon
              name={currentStep === 1 ? "order-step2-active" : "order-step2"}
            />
          ),
        },
        {
          title: "Đang giao hàng",
          description: formatTime(
            detailUpdate?.find(i => i?.trang_thai === 3)?.thoi_gian_cap_nhat,
          ),
          icon: (
            <SvgIcon
              name={currentStep === 2 ? "order-step3-active" : "order-step3"}
            />
          ),
        },
        {
          title: "Đã giao",
          description: formatTime(
            detailUpdate?.find(i => i?.trang_thai === 4)?.thoi_gian_cap_nhat,
          ),
          icon: (
            <SvgIcon
              name={currentStep === 3 ? "order-step4-active" : "order-step4"}
            />
          ),
        },
        {
          title: "Đánh giá",
          description: formatTime(
            detailUpdate?.find(i => i?.trang_thai === 5)?.thoi_gian_cap_nhat,
          ),
          icon: (
            <SvgIcon
              name={currentStep === 4 ? "order-step5-active" : "order-step5"}
            />
          ),
        },
      ]

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end"></div>
  )
  return (
    <ModalOrderDetail
      title={false}
      footer={renderFooter()}
      width={1024}
      open={open}
      onCancel={onCancel}
      closeIcon={false}
    >
      <Spin spinning={loading}>
        <OrderDetailStyled>
          <Row className="justify-content-space-between">
            <div />
            <Space className="align-items-center">
              <div className="sub-color">
                Mã đơn hàng: <span>{detail?.ma_don_hang}</span>
              </div>
              <Divider type="vertical" />
              <div style={{ color: COLOR_STATUS_ORDER[detail.trang_thai] }}>
                {detail?.ten_trang_thai}
              </div>
            </Space>
          </Row>
          <Divider />
          <StepsStyled className="p-24 mt-16">
            <Steps
              current={isCancel ? 1 : currentStep}
              labelPlacement="vertical"
            >
              {items?.map((i, idx) => (
                <Step {...i} key={`step${idx}`} />
              ))}
            </Steps>
          </StepsStyled>
          <Divider />
          <Space className="d-flex justify-content-flex-end">{setBtn()}</Space>
          <Divider />
          <Row gutter={20} className="pl-16">
            <Col flex="auto">
              <div className="fw-600 mb-8">Địa chỉ nhận hàng</div>
              <div>{detail?.ten_nguoi_nhan}</div>
              <div>{detail?.sdt_nguoi_nhan}</div>
              <div>{detail?.dia_chi_nhan_hang}</div>
            </Col>
            {/* <Col className="box-status-delivery">
              <Timeline>
                {detail?.ListStatusDetails.map((i, idx) => (
                  <Timeline.Item className={idx ? "dotGray" : "dotGreen"}>
                    <Row>
                      <div style={{ minWidth: 200 }}>
                        {moment(i?.CreateDate).format("HH:mm:ss DD/MM/YYYY")}
                      </div>
                      <div style={{ color: "#00C590" }}>
                        {i?.StatusOrderName}
                      </div>
                    </Row>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Col> */}
          </Row>
          {detail?.ly_do_huy_don ? (
            <div
              className="p-16 mt-16 mb-16"
              style={{
                background: "#FFFDE5",
              }}
            >
              <div className="fw-600">Lý do huỷ đơn</div>
              <div className="mt-12">{detail?.ly_do_huy_don}</div>
            </div>
          ) : (
            <Divider />
          )}

          <div className="fw-600 pl-16 mb-10">Sản phẩm</div>
          <Row
            gutter={20}
            className="pl-16 nowrap justify-content-space-between"
          >
            <Col style={{ width: "calc(100% - 450px)" }}>
              {detail?.list_product?.map(prod => (
                <Row
                  gutter={20}
                  style={{ flexWrap: "nowrap" }}
                  className="align-items-center mb-16"
                >
                  <Col>
                    <img alt="" src={prod?.anh} style={{ height: 70 }} />
                  </Col>
                  <Col>
                    <div
                      className="fw-600 text-ellipsis"
                      style={{ color: "var(--color-brown)" }}
                    >
                      {prod?.ten_san_pham}
                    </div>
                    <div
                      className="fs-12"
                      style={{ color: "var(--color-orange )" }}
                    >
                      x {prod?.so_luong}, {SIZE_PRODUCT[prod?.kich_co]}
                    </div>
                    <div className="d-flex align-items-flex-end">
                      <div
                        className="fw-600 mr-10"
                        style={{ color: "#ED1117" }}
                      >
                        {formatMoneyVND(prod?.gia_ban)}
                      </div>
                      <del className="sub-color fs-12 ">
                        {!!prod?.gia_ban_goc
                          ? formatMoneyVND(prod?.gia_ban_goc)
                          : ""}
                      </del>
                    </div>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col style={{ width: 400 }}>
              <Row className="align-items-center justify-content-space-between">
                <div className="sub-color">
                  Tạm tính ({detail?.list_product?.length} Sản phẩm):
                </div>
                <div> {formatMoneyVND(detail?.tong_tien)}</div>
              </Row>
              <Row className="align-items-center justify-content-space-between mt-16">
                <div className="sub-color">Phí vận chuyển:</div>
                <div>0VNĐ</div>
              </Row>
              <Row className="align-items-center justify-content-space-between  mt-10">
                <div className="sub-color">Tổng cộng:</div>
                <div className="fs-20" style={{ color: "#ED1117" }}>
                  {formatMoneyVND(detail?.tong_tien)}
                </div>
              </Row>
              <Row className="align-items-center justify-content-space-between  mt-10">
                <div className="sub-color">Phương thức thanh toán:</div>
                <div style={{ color: "#237804" }}>
                  {PAYMENT_TYPE[detail?.kieu_thanh_toan]}
                </div>
              </Row>
            </Col>
          </Row>
          {/* {!!vote && (
            <Vote
              listProduct={listPro}
              onOk={getdetail}
              visible={vote}
              onCancel={() => setVote(undefined)}
            />
          )} */}
        </OrderDetailStyled>
      </Spin>
    </ModalOrderDetail>
  )
}

export default OrderDetail
