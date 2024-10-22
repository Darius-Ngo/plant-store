import { Badge, Card, Rate } from "antd"
import { CardProductStyle } from "./styled"
import { formatMoneyVND } from "src/lib/utils"
import ROUTER from "src/router"
import { useNavigate } from "react-router-dom"
const { Meta } = Card

const ProductCard = ({ hoverable = false, product, isSmall = false }) => {
  const navigate = useNavigate()

  return (
    <CardProductStyle>
      {/* <Badge.Ribbon
        text={product.isDiscord ? `-${product.giam_gia}%` : ""}
        color="volcano"
        style={!product.isDiscord && { display: "none" }}
      > */}
        <Card
          hoverable={hoverable}
          style={{
            width: isSmall ? 210 : 240,
          }}
          cover={
            <img alt="ảnh" src={product.imageUrl} className="product-img" />
          }
          className="pointer"
          onClick={() =>
            navigate(ROUTER.CHI_TIET_SAN_PHAM, {
              state: {
                product,
              },
            })
          }
        >
          <Meta
            title={
              <div>
                <div className="product-name">{product.name}</div>
                {/* <div className="rate-product">
                  <Rate
                    disabled
                    defaultValue={+product.danh_gia_trung_binh}
                    className="fs-13"
                    allowHalf
                  />
                  <div className="rate-count">
                    {product.tong_danh_gia} đánh giá
                  </div>
                </div> */}
                <div className="product-price fs-14 mt-8">
                  {formatMoneyVND(product.price)} <span className="fs-13" style={{color: "#888"}}>/ 500g</span>
                </div>
              </div>
            }
          />
        </Card>
      {/* </Badge.Ribbon> */}
    </CardProductStyle>
  )
}

export default ProductCard
