import styled from "styled-components"

export const HomeStyled = styled.div`
  .title-home {
    position: relative;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--color-brown);
    text-align: center;
    line-height: 1.5;
    padding-bottom: 12px;
    margin-bottom: 24px;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 2px;
      background-color: var(--color-yellow);
    }
  }
`
export const ProductPopularStyle = styled.div`
  width: 100%;
  padding: 50px 0;

  .list-product {
    /* margin-top: 40px;
    width: 100%;
    background: #f5f2eb;
    padding-top: 35px; */
    /* .heading {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: 700;
      color: #e7b45a;
      text-align: center;
      margin-bottom: 40px;
    } */
    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-header);
      &:hover {
        cursor: pointer;
        color: #e7b45a;
      }
    }
    .line {
      flex: 1;
      border-bottom: 1px dashed var(--color-header);
    }
    .product-price {
      color: var(--color-header);
      font-size: 16px;
      font-weight: 600;
    }
    .product-description {
      margin-top: 4px;
      height: 30px;
      color: #555;
    }
  }

  .product-item {
    text-align: center;

    .wrap-img {
      padding: 2rem;
      border: 1px solid #ddd;
      overflow: hidden;
      & img {
        transform: scale(1);
        transition: all linear 0.3s;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
    .product-name {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-brown-dark);
      margin: 1rem 0 0.5rem;
      cursor: pointer;
      transition: all linear 0.3s;
      &:hover {
        color: #ea2c1e;
      }
    }
    .product-price {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--color-brown-dark);
      span {
        font-weight: bold;
      }
    }
  }
`
export const NewsStyle = styled.div`
  background-color: var(--color-bgr);
  width: 100%;
  padding: 50px 0;

  .news-item {
    .ant-image {
      position: relative;
      cursor: pointer;
      :hover {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.1);
          transition: all linear 0.3s;
        }
      }
    }
    .title-news {
      margin: 12px 0 8px;
      line-height: 1.5;
      transition: all ease-in-out 0.2s;
      &:hover {
        color: var(--color-yellow);
      }
    }
    .see-more {
      color: var(--color-yellow);
      margin: 12px 0 0;
      font-weight: 600;
      cursor: pointer;
    }
  }
`

export const OtherInfoStyle = styled.div`
  width: 100%;

  .swiper {
    width: 100%;
    height: 380px;
    margin-top: 8px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background-color: #fff !important;
  }

  .icon-gray {
    svg path {
      fill: rgba(0, 0, 0, 0.1);
    }
  }

  .left-slide {
    position: relative;
    .content-slide {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 50px 30px;
      color: #fff;
      line-height: 1.5;

      .title-slide {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`

export const TabsNewsStyled = styled.div`
  .hover-red {
    :hover {
      color: #f0383e;
    }
  }
  .ant-tabs-content-holder {
    padding: 0px 0px;
  }
  .bread-crumb-tab-news {
    margin-top: 0px;
    margin-bottom: 15px;
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      color: #212529;
      font-weight: 400;
      opacity: 1;
      font-size: 14px;
    }
  }
  .see-more-2 {
    position: absolute;
    top: -50px;
    right: 0px;
    cursor: pointer;
  }

  .see-more-3 {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .see-more {
    position: absolute;
    top: 20px;
    right: 0px;
    cursor: pointer;
  }
  .ant-tabs-tab-active {
    background: #f8f8f8;
  }
  .ant-tabs-tab {
    padding: 15px 25px;
    margin: 0px;
    margin-left: 0px !important;
  }
  .ant-tabs-tab-btn {
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: #154398;
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ee1d23;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
  }
`
