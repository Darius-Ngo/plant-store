import { Col, Divider, Row, Space } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import { formatMoneyVND } from "src/lib/utils"
import OrderService from "src/services/OrderService"
import { ListOrderedStyle } from "./styled"
// import OrderDetail from "./components/OrderDetail"
// import CancelOrder from "./components/CancelOrder"

const ListOrdered = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [openDetail, setOpenDetail] = useState(false)
  const [openCancelOrder, setOpenCancelOrder] = useState(false)

  const getListOrder = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListOrder(userInfo.id)
      if (res.isError) return
      setListOrder(res?.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListOrder()
  }, [])

  const setBtn = (item, data) => (
    <>
      {item?.huy_don && (
        <Button
          btnType="red-style"
          onClick={() =>
            setOpenCancelOrder({
              ...data,
              chuyen_tt: item?.huy_don?.chuyen_tt,
            })
          }
        >
          Hủy đơn
        </Button>
      )}
      {item?.mua_lai && <Button btnType="orange">Mua lại</Button>}
    </>
  )
  return (
    <LayoutCommon>
      <SpinCustom spinning={loading}>
        <ListOrderedStyle>
          {/* <Tabs
            defaultActiveKey="1"
            activeKey={condition.status}
            onChange={key =>
              setCondition({
                ...condition,
                status: key,
              })
            }
            // type="card"
            // size={size}
            items={listStatus?.map(i => ({
              label: `${i?.ten_trang_thai} (${i?.so_luong_don_hang})`,
              key: i?.trang_thai,
            }))}
          /> */}
          <Row gutter={[16, 16]} className="list-order">
            {!!listOrder?.length &&
              listOrder.map(item => (
                <Col span={24} className="order-item" key={item?.id}>
                  <Row
                    gutter={16}
                    className="list-product pointer"
                    onClick={() => setOpenDetail(item)}
                  >
                    <Col flex={"auto"} style={{ width: 0 }} className="flex-1">
                      {item?.products?.map(i => (
                        <div className="product-item d-flex">
                          <img
                            src={i?.imageUrl}
                            alt="img"
                            className="img-product"
                          />
                          <div className="mt-16">
                            <div className="product-name">{i?.name}</div>
                            <div className="quantity">x {i?.quantity}</div>
                            <div className="d-flex align-items-flex-end">
                              <div className="product-price">
                                {formatMoneyVND(i?.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Col>
                    <Col
                      style={{ width: "auto" }}
                      className=" pr-24 pt-24 pb-16 d-flex flex-column justify-content-space-between align-items-flex-end"
                    >
                      {/* <div
                        className="status-order fw-600"
                        style={{ color: COLOR_STATUS_ORDER[item?.trang_thai] }}
                      >
                        {item?.ten_trang_thai}
                      </div> */}
                      <Space className="align-items-center">
                        <div className="sub-color">
                          Ngày đặt:{" "}
                          {moment(item?.order_date).format("DD/MM/YYYY")}
                        </div>
                        <Divider
                          type="vertical"
                          style={{ background: "#999" }}
                        />
                        <div
                          className="fw-600"
                          // style={{ color: COLOR_STATUS_ORDER[item.status] }}
                        >
                          {item?.status}
                        </div>
                      </Space>
                      <div className="d-flex fw-600 ">
                        Tổng cộng:{" "}
                        <span
                          className="fs-16 ml-12"
                          style={{ color: "var(--color-red-500)" }}
                        >
                          {formatMoneyVND(+item?.total_price)}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  {/* <Space size={16} className="justify-content-flex-end w-100">
                    {setBtn(item?.list_btns, item)}
                  </Space> */}
                </Col>
              ))}
          </Row>
        </ListOrderedStyle>
      </SpinCustom>
      {/* {!!openDetail && (
        <OrderDetail
          detail={openDetail}
          open={openDetail}
          onCancel={() => setOpenDetail(false)}
          setBtn={() => setBtn(openDetail?.list_btns, openDetail)}
        />
      )}
      {!!openCancelOrder && (
        <CancelOrder
          open={openCancelOrder}
          onCancel={() => setOpenCancelOrder(false)}
          onOk={() => {
            getListOrder()
            getTotalStatus()
          }}
        />
      )} */}
    </LayoutCommon>
  )
}

export default ListOrdered
