import styled from "styled-components"
import footer_bgr from "src/assets/images/footer/footer-img.jpg"

export const FooterStyled = styled.div`
  .content-footer {
    padding-bottom: 50px;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: url(${footer_bgr});
    color: #fff;
  }

  .end-page {
    padding: 20px;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
