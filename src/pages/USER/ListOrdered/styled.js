import { Modal } from "antd"
import styled from "styled-components"

export const ListOrderedStyle = styled.div`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--color-orange);
  }
  .ant-tabs .ant-tabs-ink-bar {
    background-color: var(--color-orange);
  }
  .ant-tabs .ant-tabs-tab:hover {
    color: var(--color-orange);
  }

  .order-item {
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(21, 67, 152, 0.15);
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
  .list-product {
    border-bottom: 1px solid #ddd;
    margin-bottom: 12px;
    .product-item {
      width: 100%;
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .img-product {
        height: 100px;
      }
      .product-name {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--color-brown);
      }
      .product-size {
        color: var(--color-orange);
        font-size: 12px;
      }
      .quantity {
        color: var(--color-orange);
        font-size: 12px;
        margin-bottom: 8px;
      }
      .product-price {
        color: var(--color-red-500);
        font-weight: 600;
      }
    }
  }
  .flex-1 {
    flex: 1;
  }
`

export const ModalOrderDetail = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-close {
    display: none;
  }
`

export const OrderDetailStyled = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(21, 67, 152, 0.15);
  border-radius: 8px;
  padding: 20px;
  /* margin-top: 20px; */
  .dotGray .ant-timeline-item-head {
    background-color: #dddddd;
    border-color: #dddddd;
  }
  .dotGreen .ant-timeline-item-head {
    background-color: #00c590;
    border-color: #00c590;
  }
  .box-status-delivery {
    padding-left: 30px !important;
    border-left: 1px solid #dddddd;
    padding-top: 5px;
  }
  .ant-timeline-item-last {
    padding-bottom: 0px;
    .ant-timeline-item-content {
      min-height: unset;
    }
  }
  .ant-steps-item-content {
    margin-left: 11px;
  }
`
export const RateStyled = styled.div`
  .title {
    font-weight: 600;
    font-size: 16px;
  }
  .rate {
    margin-bottom: 10px;
    text-align: center;
    .anticon svg {
      font-size: 50px;
    }
  }

  .image-css {
    width: 100px;
    height: 100px;
    border: 1px solid #e9ebec;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-image .ant-image-mask {
      top: calc(50% - 11px);
      bottom: unset;
    }
  }

  .ant-rate-star-full {
    svg path {
      fill: #fadb14;
    }
  }
`
export const StepsStyled = styled.div`
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: linear-gradient(270deg, #154398 0%, #ed1117 100%);
  }
  .ant-steps-item-tail::after {
    width: calc(100% - 20px);
    margin-left: 20px;
  }
  .ant-steps-item-content {
    width: 145px;
  }
  .ant-steps-item-title {
    font-size: 14px;
  }
  .ant-steps-item-description {
    font-size: 12px;
  }
`
