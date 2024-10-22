import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Sản phẩm",
      key: ROUTER.DS_SAN_PHAM,
    },
    // {
    //   label: "Chi tiết sản phẩm",
    //   key: ROUTER.CHI_TIET_SAN_PHAM,
    // },
    // {
    //   label: "Chi tiết giỏ hàng",
    //   key: ROUTER.CHI_TIET_GIO_HANG,
    // },
    // {
    //   label: "Danh sách đơn hàng",
    //   key: ROUTER.DS_DON_DAT_HANG,
    // },
    // {
    //   label: "Tin tức",
    //   key: ROUTER.TIN_TUC,
    //   children: [
    //     {
    //       label: "Chi tiết tin tức",
    //       key: ROUTER.CHI_TIET_TIN_TUC,
    //     },
    //   ],
    // },
    // {
    //   label: "Yêu cầu hỗ trợ",
    //   key: ROUTER.HO_TRO,
    // },
    // {
    //   label: "Giới thiệu",
    //   key: ROUTER.GIOI_THIEU,
    //   children: [
    //     {
    //       label: "Chi tiết giới thiệu",
    //       key: ROUTER.GIOI_THIEU_CHI_TIET,
    //     },
    //   ],
    // },
    // {
    //   label: "Danh sách yêu cầu hỗ trợ",
    //   key: ROUTER.QL_YCHT,
    // },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = () => {
  return [
    {
      label: "Thống kê",
      key: ROUTER.THONG_KE,
      icon: <SvgIcon name="chart-line" />,
      TabID: [1],
    },
    {
      label: "Quản lý đơn hàng",
      key: ROUTER.QUAN_LY_DON_HANG,
      icon: <SvgIcon name="report" />,
      TabID: [2],
    },
    {
      label: "Quản lý tài khoản",
      key: "subkey1",
      icon: <SvgIcon name="people" />,
      TabID: [3, 4],
      children: [
        {
          key: ROUTER.QUAN_LY_NHAN_VIEN,
          label: "Tài khoản nhân viên",
          TabID: [3],
        },
        {
          key: ROUTER.QUAN_LY_KHACH_HANG,
          label: "Tài khoản khách hàng",
          TabID: [4],
        },
      ],
    },
    {
      label: "Quản lý sản phẩm",
      key: "subkey2",
      icon: <SvgIcon name="dashboard" />,
      TabID: [5, 6],
      children: [
        {
          label: "Danh sách danh mục",
          key: ROUTER.QUAN_LY_DANH_MUC,
          TabID: [5],
        },
        {
          label: "Danh sách sản phẩm",
          key: ROUTER.QUAN_LY_SAN_PHAM,
          TabID: [6],
        },
      ],
    },
    {
      label: "Quản lý tin tức",
      key: "subkey3",
      icon: <SvgIcon name="post-card" />,
      TabID: [7, 8],
      children: [
        {
          key: ROUTER.QUAN_LY_BAI_VIET,
          label: "Danh sách bài viết",
          TabID: [7],
        },
        {
          key: ROUTER.DANH_SACH_THE,
          label: "Danh sách thẻ",
          TabID: [8],
        },
      ],
    },
    {
      label: "Xử lý yêu cầu hỗ trợ",
      key: ROUTER.YEU_CAU_HO_TRO,
      icon: <SvgIcon name="headphone" />,
      TabID: [9],
    },
  ]
}

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
    // {
    //   label: "Tin tức",
    //   key: ROUTER.TIN_TUC,
    //   // icon: <SvgIcon name="home" />,
    // },
    // {
    //   label: "Giới thiệu",
    //   key: ROUTER.GIOI_THIEU,
    //   // icon: <SvgIcon name="home" />,
    // },
    // {
    //   label: "Hỗ trợ",
    //   key: ROUTER.HO_TRO,
    //   // icon: <SvgIcon name="home" />,
    // },
  ]
}
