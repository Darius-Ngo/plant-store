import React, { useState, useEffect } from "react"
import { ListOrderedStyle } from "./styled"
import { Col, Divider, Row, Space, Spin, Tabs } from "antd"
import LayoutCommon from "src/components/Common/Layout"
import OrderService from "src/services/OrderService"
import { useSelector } from "react-redux"
import { COLOR_STATUS_ORDER, SIZE_PRODUCT } from "src/constants/constants"
import { formatMoneyVND } from "src/lib/utils"
import Button from "src/components/MyButton/Button"
import OrderDetail from "./components/OrderDetail"
import CancelOrder from "./components/CancelOrder"
import ModalRate from "./components/ModalRate"
import ModalViewRate from "./components/ModalViewRate"
// import ModalViewImg from "src/pages/ADMIN/OrderManager/components/ModalViewImg"

const ListOrdered = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [listOrder, setListOrder] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [total, setTotal] = useState(0)
  const [openDetail, setOpenDetail] = useState(false)
  const [openCancelOrder, setOpenCancelOrder] = useState(false)
  const [openRate, setOpenRate] = useState(false)
  const [openViewRate, setOpenViewRate] = useState(false)
  const [listImg, setListImg] = useState(false)
  const [condition, setCondition] = useState({
    id_nguoi_dat: userInfo.id,
    status: 0,
    // currentPage: 1,
    // pageSize: 10,
  })

  const getTotalStatus = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getTotalStatus({
        id_nguoi_dat: userInfo.id,
      })
      if (res.isError) return
      setListStatus(res.Object)
    } finally {
      setLoading(false)
    }
  }
  const getListOrder = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListOrderUser(condition)
      if (res.isError) return
      setListOrder(res.Object?.data)
      setTotal(res.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTotalStatus()
  }, [])
  useEffect(() => {
    getListOrder()
  }, [condition])

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
      {item?.danh_gia && !data?.da_danh_gia && (
        <Button
          btnType="orange"
          onClick={() =>
            setOpenRate({
              ...data,
              chuyen_tt: item?.danh_gia?.chuyen_tt,
            })
          }
        >
          Đánh giá
        </Button>
      )}
      {!!data?.da_danh_gia && (
        <Button btnType="orange-third" onClick={() => setOpenViewRate(data)}>
          Xem đánh giá
        </Button>
      )}
      {!!data?.chung_tu_tt && (
        <Button
          btnType="third"
          onClick={() =>
            setListImg({
              ...data,
              chung_tu_tt: data.chung_tu_tt.split(","),
            })
          }
        >
          Chứng từ thanh toán
        </Button>
      )}
      {item?.mua_lai && <Button btnType="orange">Mua lại</Button>}
    </>
  )
  return (
    <LayoutCommon>
      <Spin spinning={loading}>
        <ListOrderedStyle>
          <Tabs
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
          />
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
                      {item?.list_product?.map(i => (
                        <div className="product-item d-flex">
                          <img src={i?.anh} alt="" className="img-product" />
                          <div className="mt-16">
                            <div className="product-name">
                              {i?.ten_san_pham}
                            </div>
                            <div className="quantity">
                              x {i?.so_luong} {SIZE_PRODUCT[i?.kich_co]}
                            </div>
                            <div className="d-flex align-items-flex-end">
                              <div className="product-price">
                                {formatMoneyVND(i?.gia_ban)}
                              </div>
                              <del className="sub-color fs-12 ml-8">
                                {!!i?.gia_ban_goc
                                  ? formatMoneyVND(i?.gia_ban_goc)
                                  : ""}
                              </del>
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
                        <div className="sub-color">{item?.ma_don_hang}</div>
                        <Divider type="vertical" />
                        <div
                          className="fw-600"
                          style={{ color: COLOR_STATUS_ORDER[item.trang_thai] }}
                        >
                          {item?.ten_trang_thai}
                        </div>
                      </Space>
                      <div className="d-flex fw-600 ">
                        Tổng cộng:{" "}
                        <span
                          className="fs-16 ml-12"
                          style={{ color: "var(--color-red-500)" }}
                        >
                          {formatMoneyVND(item?.tong_tien)}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Space size={16} className="justify-content-flex-end w-100">
                    {setBtn(item?.list_btns, item)}
                  </Space>
                </Col>
              ))}
          </Row>
        </ListOrderedStyle>
      </Spin>
      {!!openDetail && (
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
      )}
      {!!openRate && (
        <ModalRate
          open={openRate}
          onCancel={() => setOpenRate(false)}
          onOk={() => {
            getListOrder()
            getTotalStatus()
          }}
        />
      )}
      {!!openViewRate && (
        <ModalViewRate
          open={openViewRate}
          onCancel={() => setOpenViewRate(false)}
          onOk={() => {
            getListOrder()
            getTotalStatus()
          }}
        />
      )}
      {/* <ModalViewImg open={listImg} onCancel={() => setListImg(false)} /> */}
    </LayoutCommon>
  )
}

export default ListOrdered
