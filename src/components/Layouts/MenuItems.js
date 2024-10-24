import ROUTER from "src/router"
const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Sản phẩm",
      key: ROUTER.DS_SAN_PHAM,
    },
    {
      label: "Chi tiết sản phẩm",
      key: ROUTER.CHI_TIET_SAN_PHAM,
    },
    {
      label: "đặt hàng",
      key: ROUTER.CHI_TIET_GIO_HANG,
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuHeader = () => {
  return [
    {
      label: "Trang chủ",
      key: ROUTER.HOME,
      // icon: <SvgIcon name="home" />,
    },
    {
      label: "Sản phẩm",
      key: ROUTER.DS_SAN_PHAM,
      // icon: <SvgIcon name="home" />,
    },
  ]
}
