import { useEffect, useState } from "react"
import SpinCustom from "src/components/Spin"
import ProductService from "src/services/ProductService"
import Slider from "../Slider"
import OtherInfo from "./components/OtherInfo"
import ProductPopular from "./components/ProductPopular"
import { HomeStyled } from "./styled"

function HomePage() {
  const [loading, setLoading] = useState(false)
  const [listProducts, setListProduct] = useState([])
  const getListProducts = async () => {
    try {
      setLoading(true)
      const res = await ProductService.getListProducts()
      if (!res.data) return
      setListProduct(res.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListProducts()
  }, [])
  return (
    <HomeStyled className="d-flex flex-column align-items-center">
      <Slider />
      {/* <SpinCustom spinning={loading}> */}
      <ProductPopular listProduct={listProducts} />
      <OtherInfo />
      {/* </SpinCustom> */}
    </HomeStyled>
  )
}
export default HomePage
