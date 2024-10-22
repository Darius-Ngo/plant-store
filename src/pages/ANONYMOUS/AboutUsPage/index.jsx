import img_1 from "src/assets/images/about-us/img_1.jpg"
import img_2 from "src/assets/images/about-us/img_2.jpg"
import img_3 from "src/assets/images/about-us/img_3.jpg"
import { AboutUsPageStyle } from "./styled.js"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router/index.js"
import { useEffect } from "react"

const AboutPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <AboutUsPageStyle>
      <div className="about-row row-1">
        <div className="content-left">
          <div className="title">KHỞI NGUỒN</div>
          <div className="content">
            Thương hiệu bắt nguồn từ cà phê Việt Nam
          </div>
          <div className="description">
            Cafe Bất Ổn® được sinh ra từ niềm đam mê bất tận với hạt cà phê Việt
            Nam. Qua một chặng đường dài, chúng tôi đã không ngừng mang đến
            những sản phẩm cà phê thơm ngon, sánh đượm trong không gian thoải
            mái và lịch sự với mức giá hợp lý. Những ly cà phê của chúng tôi
            không chỉ đơn thuần là thức uống quen thuộc mà còn mang trên mình
            một sứ mệnh văn hóa phản ánh một phần nếp sống hiện đại của người
            Việt Nam.
          </div>
          <span
            className="btn-view"
            onClick={() =>
              navigate(ROUTER.GIOI_THIEU_CHI_TIET, {
                state: {
                  id: 1,
                },
              })
            }
          >
            XEM CHI TIẾT
          </span>
        </div>
        <div className="img-right h-100">
          <img src={img_1} alt="" />
        </div>
      </div>

      <div className="about-row row-2">
        <div className="img-left h-100">
          <img src={img_2} alt="" width={"100%"} />
        </div>
        <div className="content-right">
          <div className="title">DỊCH VỤ KHÁCH HÀNG</div>
          <div className="content">Chào mừng bạn đến với Cafe Bất Ổn®</div>
          <div className="description">
            Chúng tôi mong muốn mang đến cho bạn những trải nghiệm đáng nhớ mỗi
            lần đến Cafe Bất Ổn®. Hãy chia sẻ với chúng tôi để chúng tôi có thể
            mang đến cho bạn những trải nghiệm tuyệt vời hơn thế.
          </div>
          <span
            className="btn-view"
            onClick={() =>
              navigate(ROUTER.GIOI_THIEU_CHI_TIET, {
                state: {
                  id: 2,
                },
              })
            }
          >
            XEM CHI TIẾT
          </span>
        </div>
      </div>

      <div className="about-row row-3">
        <div className="content-left">
          <div className="title">NGHỀ NGHIỆP</div>
          <div className="content">
            Hãy khởi đầu sự nghiệp cùng với Cafe Bất Ổn®
          </div>
          <div className="description">
            Với sứ mệnh trở thành thương hiệu cà phê Việt Nam dẫn đầu, Highlands
            Coffee® luôn tìm kiếm những ứng cử viên tiềm năng có chung niềm đam
            mê và nỗ lực cùng chúng tôi vươn tới thành công. Chúng tôi luôn chào
            đón các bạn gia nhập vào đội ngũ chuyên nghiệp của gia đình Cafe Bất
            Ổn®.
          </div>
          <span
            className="btn-view"
            onClick={() =>
              navigate(ROUTER.GIOI_THIEU_CHI_TIET, {
                state: {
                  id: 3,
                },
              })
            }
          >
            XEM CHI TIẾT
          </span>
        </div>
        <div className="img-right h-100">
          <img src={img_3} alt="" />
        </div>
      </div>
    </AboutUsPageStyle>
  )
}

export default AboutPage
