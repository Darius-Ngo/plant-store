import { Empty, Tooltip } from "antd"
import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import { formatMoney, formatMoneyVND } from "src/lib/utils"
import { setListCart } from "src/redux/appGlobal"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import { CartSmallStyle } from "./styled"

const CartSmall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listCart, userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)

  const getListCart = async user_id => {
    try {
      setLoading(true)
      const res = await CartService.getListCart(user_id)
      dispatch(setListCart(res.data || []))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    try {
      setLoading(true)
      const res = await CartService.deleteCart(id)
      Notice({
        msg: "Xóa thành công.",
      })
      await getListCart(userInfo.id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartSmallStyle>
      <SpinCustom spinning={loading}>
        <div className="cart-title">Danh sách sản phẩm</div>
        <div className="cart-content">
          {listCart &&
            listCart?.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-item__img">
                  <img
                    src={item?.Product?.imageUrl}
                    alt={item?.Product?.name}
                    width={30}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cart-item__content">
                    {item?.Product?.name}
                  </div>
                  <div className="fs-10" style={{ color: "#e7b45a" }}>
                    {formatMoney(item?.Product?.price)} x {item?.quantity}
                  </div>
                </div>
                <div>
                  <div className="cart-item__price">
                    {formatMoneyVND(item?.Product?.price * item?.quantity)}
                  </div>
                </div>
                <Tooltip placement="right" title="Xóa sản phẩm" color="#f5222d">
                  <div
                    className="cart-item__delete"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <MdDeleteOutline />
                  </div>
                </Tooltip>
              </div>
            ))}
          {!listCart.length && (
            <Empty
              image={
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png"
                  alt=""
                />
              }
              description={"Chưa có sản phẩm nào!"}
            />
          )}
        </div>
        <div className="d-flex justify-content-flex-end pr-16 pl-16">
          <Button
            onClick={
              () => navigate(ROUTER.CHI_TIET_GIO_HANG)
              // CB1({
              //   title: `Bạn có chắc chắn muốn đặt hàng không?`,
              //   icon: "signSuccess",
              //   okText: "Đồng ý",
              //   onOk: () => {
              //     navigate(ROUTER.CHI_TIET_GIO_HANG)
              //     // handleOrder()
              //   },
              // })
            }
            btnType="red"
            className="text-right mt-12"
          >
            Đặt hàng ngay
          </Button>
        </div>
      </SpinCustom>
    </CartSmallStyle>
  )
}

export default CartSmall
