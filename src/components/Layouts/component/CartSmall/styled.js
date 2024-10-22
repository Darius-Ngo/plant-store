import styled from "styled-components"

export const CartSmallStyle = styled.div`
  background-color: #fff;
  box-shadow: 1px 1px 12px 2px rgba(0, 0, 0, 0.1);
  width: 360px;
  padding: 8px 0;
  border-radius: 4px;
  overflow: hidden;
  .cart-title {
    font-size: 14px;
    font-weight: 500;
    color: #777;
    text-align: left;
    padding: 4px 8px;
  }
  .cart-content {
    padding-top: 8px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    .cart-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 12px 8px;
      position: relative;
      border-bottom: 1px solid #eee;
      &:hover {
        background-color: #f0f0f0;
        .cart-item__delete {
          right: 0px;
          opacity: 1;
          cursor: pointer;
        }
      }

      &__img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        margin-right: 12px;
      }
      &__content {
        flex: 1;
        font-size: 12px;
        font-weight: 600;
        color: var(--color-brown-dark);
        margin-right: 12px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        overflow: hidden;
      }
      &__price {
        font-size: 12px;
        font-weight: 600;
        color: #fa541c;
      }
      &__delete {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #fff;
        background-color: #ff4d4f;
        position: absolute;
        top: 0;
        right: -40px;
        bottom: 0;
        width: 40px;
        opacity: 0;
        transition: all 0.4s;
      }
    }
  }
  .btn-order {
    padding: 16px 8px 8px;
    text-align: right;
    button {
      /* background-color: #fa541c; */
      background-color: #cf1322;
      color: #fff;
      border-color: #ddd;
      font-size: 14px;
      font-weight: bold;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
`
