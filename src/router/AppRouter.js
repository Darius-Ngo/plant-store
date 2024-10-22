import { Spin } from "antd"
import React from "react"
import { useRoutes } from "react-router-dom"
import ROUTER from "./index"
// ANONYMOUS
const PublicRouters = React.lazy(() => import("src/pages/PublicRouters"))
const NotFound = React.lazy(() => import("src/pages/NotFound"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const MenuPage = React.lazy(() => import("src/pages/ANONYMOUS/MenuPage"))
const ProductDetail = React.lazy(() =>
  import("src/pages/ANONYMOUS/ProductDetail"),
)
const ContactSupport = React.lazy(() => import("src/pages/ANONYMOUS/Contact"))
const AboutUsPage = React.lazy(() => import("src/pages/ANONYMOUS/AboutUsPage"))
const AboutUsDetail = React.lazy(() =>
  import("src/pages/ANONYMOUS/AboutUsPage/components/AboutUsDetail"),
)

// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))
const CartPage = React.lazy(() => import("src/pages/USER/CartPage"))
const ListOrdered = React.lazy(() => import("src/pages/USER/ListOrdered"))
const MyRequest = React.lazy(() => import("src/pages/USER/MyRequest"))

function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          <Spin />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  //  USER
  {
    element: (
      <LazyLoadingComponent>
        <PrivateRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.DOI_MAT_KHAU,
        element: <LazyLoadingComponent></LazyLoadingComponent>,
      },
      {
        path: ROUTER.CHI_TIET_GIO_HANG,
        element: (
          <LazyLoadingComponent>
            <CartPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DS_DON_DAT_HANG,
        element: (
          <LazyLoadingComponent>
            <ListOrdered />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QL_YCHT,
        element: (
          <LazyLoadingComponent>
            <MyRequest />
          </LazyLoadingComponent>
        ),
      },
    ],
  },

  //  ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <PublicRouters />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.HOME,
        element: (
          <LazyLoadingComponent>
            <Home />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DS_SAN_PHAM,
        element: (
          <LazyLoadingComponent>
            <MenuPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CHI_TIET_SAN_PHAM,
        element: (
          <LazyLoadingComponent>
            <ProductDetail />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.HO_TRO,
        element: (
          <LazyLoadingComponent>
            <ContactSupport />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.GIOI_THIEU,
        element: (
          <LazyLoadingComponent>
            <AboutUsPage />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.GIOI_THIEU_CHI_TIET,
        element: (
          <LazyLoadingComponent>
            <AboutUsDetail />
          </LazyLoadingComponent>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFound />
      </LazyLoadingComponent>
    ),
  },
]
const AppRouter = () => {
  const renderRouter = useRoutes(routes)
  return renderRouter
}
export default AppRouter
