import { Spin } from "antd"
import React from "react"
import { useRoutes } from "react-router-dom"
import ROUTER from "./index"
import ListOrdered from "src/pages/USER/ListOrdered"
// ANONYMOUS
const PublicRouters = React.lazy(() => import("src/pages/PublicRouters"))
const NotFound = React.lazy(() => import("src/pages/NotFound"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const ProductList = React.lazy(() => import("src/pages/ANONYMOUS/ProductList"))
const ProductDetail = React.lazy(() =>
  import("src/pages/ANONYMOUS/ProductDetail"),
)
// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))
// const CartPage = React.lazy(() => import("src/pages/USER/CartPage"))
// const ListOrdered = React.lazy(() => import("src/pages/USER/ListOrdered"))

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
      // {
      //   path: ROUTER.CHI_TIET_GIO_HANG,
      //   element: (
      //     <LazyLoadingComponent>
      //       <CartPage />
      //     </LazyLoadingComponent>
      //   ),
      // },
      {
        path: ROUTER.DS_DON_DAT_HANG,
        element: (
          <LazyLoadingComponent>
            <ListOrdered />
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
            <ProductList />
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
