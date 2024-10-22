import styled from "styled-components"

export const ProductDetailStyle = styled.div`
  background-color: #fff;
  padding: 20px 0;
  margin-bottom: 16px;
  .wrap-info {
    box-shadow: 0px 0px 30px 0px rgba(21, 66, 151, 0.1);
    border-radius: 4px;
    padding: 12px;
  }
  &_content {
    padding: 9rem 9rem 2rem;
    background-color: #fff;
  }
  .product-detail-title {
    font-size: 36px;
    margin-top: 12px;
    font-weight: bold;
    color: var(--color-brown-dark);
  }
  .product-description {
    font-size: 16px;
    font-weight: 500;
    padding: 0.5rem 0 1rem;
    text-align: justify;
    line-height: 1.5;
  }
  /* .row-content {
    display: flex;
    align-items: flex-start;
    border-bottom: 2px solid #ddd;
    padding-bottom: 2rem; */

  & .wrap-img {
    border: 1px solid #ddd;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }
  & .wrap-content {
    width: 70%;
    height: 100%;
    margin: 0;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 24px;
    .btn-order {
      background-color: #cf1322;
      color: #fff;
      border: 2px solid #cf1322;
      width: 300px;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 8px;
      padding: 13px 70px;
      margin-top: 24px;
      /* box-shadow: 6px 10px 16px 6px rgb(0 0 0 / 20%); */
      cursor: pointer;
    }
    .btn-ordered {
      color: #cf1322;
      background-color: #fff;
      border: 2px solid #cf1322;
      width: 300px;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 8px;
      padding: 13px 70px;
      margin-top: 24px;
    }

    .product-option {
      .title-item {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        width: 80px;
        color: var(--color-header);
      }
      .option-size {
        display: flex;
        align-items: center;
        .ant-radio-button-wrapper {
          margin-right: 8px;
          font-weight: 600;
          height: 40px;
          font-size: 16px;
          line-height: 37px;

          &:focus-within {
            box-shadow: unset;
            border: 1px solid #b22830;
            background-color: #b22830;
            color: #fff;
            &::before {
              width: 0;
            }
          }
          &:hover {
            color: #b22830;
          }
        }
        .ant-radio-button-wrapper-checked:not(
            .ant-radio-button-wrapper-disabled
          ) {
          /* color: #b22830; */
          border: 1px solid #b22830;
          background-color: #b22830;
          color: #fff;
        }
      }
      .product-price {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        font-size: 22px;
        color: var(--color-yellow);
      }
    }
  }

  .list-product_relative {
    max-height: 500px;
    overflow-y: auto;
  }
`
export const InputChangeQuantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  width: fit-content;
  .input-change {
    border-radius: 0;
    border: 0;
    box-shadow: none;
    width: 45px !important;
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
  .btn-change {
    height: 38px;
    width: 28px;
    font-size: 20px;
    border: 0;
    cursor: pointer;
    &:hover {
      background-color: #d9d9d9;
    }
  }
  .btn-change:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #999;
  }
`

export const TabsStyled = styled.div`
  @media (max-width: 450px) {
    .ant-tabs.ant-tabs-top.ant-tabs-mobile.rating-row {
      width: 60% !important;
    }

    .description-product {
      img {
        height: 178px;
      }
    }
  }
  @media (max-width: 390px) {
    .description-product {
      img {
        height: 178px;
      }
    }
  }

  .hover-red {
    :hover {
      color: var(--color-header);
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
      color: var(--color-header);
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
  }
  .ant-tabs-tab-btn {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: var(--color-header);
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #bc956c;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #bc956c 0%, var(--color-header) 100%);
  }
`

export const RatingProductWrapper = styled.div`
  border: solid #dddddd;
  border-width: 0 1px 1px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-review {
    overflow: auto;
    width: 100%;
  }

  .image-box {
    width: 100px;
    min-width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0px;
    border: 1px solid rgba(131, 131, 131, 0.1);
  }
  .ant-pagination {
    display: flex;
  }
  .ant-tabs-nav {
    margin: 0px;
  }
  .ant-tabs-content-holder {
    display: none;
  }
  .ant-spin-nested-loading {
    width: 100%;
  }
  .border-bottom {
    border: 1px solid #dddddd;
    border-width: 0 0px 1px;
    display: flex;
  }

  .averaging {
    padding: 10px 0 20px;
    .anticon {
      font-size: 26px;
    }
    .ant-rate {
      font-size: 0 !important;
    }
  }

  .box-option {
    display: flex;
    align-items: center;
    border: 0 solid #ddd;
    border-left-width: 1px;
    padding: 15px 10px;
  }

  .progress-rating {
    .ant-rate {
      min-width: 130px;
    }
  }

  .time-comment {
    font-size: 12px;
    color: #666666;
    padding-top: 15px;
  }

  .content-comment {
    font-size: 14px;
    color: #000000;
    padding: 15px 0;
  }

  .username {
    font-size: 12px;
    color: #000000;
  }

  .btn-see-more {
    margin: 20px 0;
    color: #154398;
    border: 1px solid #154398;
  }
`
