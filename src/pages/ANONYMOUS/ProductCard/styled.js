import styled from "styled-components"

export const CardProductStyle = styled.div`
  .ant-card {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd !important;

    .product-img {
      border: 1px solid #ddd;
      height: 200px;
    }
    .product-name {
      color: var(--color-brown);
    }
    .ant-card-body {
      padding: 12px 8px 8px 0;
    }
    .rate-product {
      display: flex;
      .rate-count {
        font-size: 13px;
        color: #777;
        font-weight: 500;
        margin-left: 12px;
      }
    }
    .product-price {
      color: var(--color-red-500);
      font-weight: 600;
    }
  }
`
