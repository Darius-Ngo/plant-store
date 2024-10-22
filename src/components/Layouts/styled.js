import { Menu } from "antd"
import styled from "styled-components"

export const StyleMenuAccount = styled.div`
  .menu-account {
    background: #f3f6fc;
    padding: 6px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 10px;
    .btn-logout {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      font-weight: 600;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: rgb(237, 17, 23);
          }
        }
      }
    }
    .btn-function {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
          }
        }
      }
    }
    .strok-btn-function {
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
            stroke: #9a9a9a;
          }
        }
      }
    }
    .ant-dropdown-menu-item {
      background: #fff !important;
      padding: 5px 0px;
    }
    .ant-dropdown-menu-item:hover {
      background: #f5f5f5 !important;
    }
    .ant-dropdown-menu {
      position: relative !important;
      width: 100% !important;
      padding: 0 !important;
      box-shadow: unset;
      background: none;
      .account-infor {
        background: #fff;
        padding: 10px;
        border-radius: 20px 20px 3px 3px;
        margin-bottom: 3px;
        .ant-divider {
          margin: 10px 0px;
        }
        .infor {
          margin-bottom: 8px;
        }
        .sumary-infor-user {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          height: 100%;
        }
      }
      .account-function {
        background: #fff;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 3px;
      }
      .account-logout {
        background: #fff;
        padding: 10px;
        border-radius: 3px 3px 20px 20px;
      }
    }
  }
`
export const LayoutStyled = styled.div`
  .logo {
    height: 45px;
  }
  .logo-text {
    font-size: 22px;
    color: #fff;
  }
  .header-background {
    background: var(--color-header);
    box-shadow: 1px 1px 2px #ddd;

    position: sticky;
    top: 0;
    z-index: 100;
    height: auto;
    padding: 0;
    .content {
      height: 100% !important;
    }
    &.isAdmin {
      background: ${({ theme }) => theme["primary-color"]};
    }
    &.transparent {
      /* background: #ba936c; */
      background-color: transparent;
      box-shadow: unset;
    }
  }
  .body-app {
    /* background-color: var(--color-bgr); */
  }
  .fl-input-radius {
    .ant-input-group > .ant-input:first-child,
    .ant-input-group-addon:first-child {
      border-radius: 24px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .ant-input-search
      > .ant-input-group
      > .ant-input-group-addon:last-child
      .ant-input-search-button {
      border-radius: 0 24px 24px 0;
    }
  }
  .hover-menu:hover {
    .ant-scroll-number-only-unit {
      color: #fff !important;
    }
    span {
      color: #ed1117 !important;
      svg path {
        fill: #ed1117;
      }
    }
  }
  .account-infor-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fff;
    .ant-avatar {
      background: unset;
    }
    svg path {
      fill: #fff;
    }
  }
  position: relative;
  .breadcrumb-header {
    box-shadow: inset 0 5px 10px #ebebeb;
    padding: 15px 0;
    background: #f7f7f7;
  }
  .box-breadcrumb-header {
    background-color: #fff;
    /* padding-bottom: 20px; */
  }
  @keyframes App-logo-spin {
    0%,
    100%,
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }

    10%,
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20%,
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
  }
  .login-item {
    padding: 4px 12px;
    &:first-child {
      border-right: 1px solid #fff;
    }
    .login-item_text {
      font-weight: 600;
      font-size: 14px;
      line-height: 15px;
      color: #fff;
      margin-left: 6px;
    }
    .login-icon {
      svg {
        width: 15px;
        height: 15px;
      }
    }
    .register-icon {
      svg {
        width: 22px;
        height: 22px;
      }
    }
    svg {
      path {
        fill: #fff;
      }
    }
  }
  .wrap-icon-cart {
    background: #fff;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-layout {
    background-color: #fff;
  }

  .flex-end-col {
    display: flex;
    justify-content: flex-end;
  }

  .ant-badge-multiple-words {
    padding: 0px 5px;
  }
  .ant-scroll-number-only-unit {
    font-size: 10px;
  }
  .ant-badge-count {
    font-size: 10px;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(30%, -30%);
  }
`

export const CustomMenuStyled = styled.div`
  .ant-menu {
    background-color: unset;
    /* width: calc(100vw - 650px); */
  }
  /* .ant-menu-submenu-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  } */
  .ant-menu-item,
  .ant-menu-submenu {
    padding: 0px !important;
    margin-right: 8px;
    top: 11px;
    display: flex;
    align-items: center;
  }

  .ant-menu-submenu-title {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 42%;
      right: 3px;
      border-width: 6px 4px;
      border-style: solid;
      border-color: #fff transparent transparent;
    }
    .ant-menu-title-content {
      padding-right: 18px;
    }
  }

  .ant-menu-submenu-popup .ant-menu-vertical .ant-menu-submenu {
    border-bottom: 1px dashed #e1e1e1;
    &:last-child {
      border-bottom: unset;
    }
  }
  .ant-menu-submenu:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal {
    border-bottom: 0px;
  }
  .ant-menu-title-content {
    color: #fff;
    padding: 14px;
    font-weight: 600;
  }

  .ant-menu-item:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-submenu:hover {
    color: transparent !important;
  }
  .ant-menu-submenu::after {
    border: unset !important;
  }
  .ant-menu-item-selected .ant-menu-title-content,
  .ant-menu-submenu-selected .ant-menu-submenu-title span,
  .ant-menu-item:hover .ant-menu-title-content,
  .ant-menu-overflow-item:hover
    .ant-menu-submenu-title
    .ant-menu-title-content {
    /* color: ${({ theme }) => theme["primary-color"]} !important;
    background-color: #fff; */
    transition: all linear 0.3s;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #fff;
    }
  }
  .ant-menu-overflow-item.ant-menu-overflow-item-rest.ant-menu-submenu-selected,
  .ant-menu-overflow-item.ant-menu-submenu-selected[aria-hidden="true"] {
    .ant-menu-submenu-title span {
      background-color: transparent;
    }
  }
  .ant-menu-overflow-item:hover .ant-menu-submenu-title,
  .ant-menu-submenu-selected .ant-menu-submenu-title {
    &::after {
      border-color: ${({ theme }) => theme["primary-color"]} transparent
        transparent;
    }
  }

  .ant-menu-overflow-item-rest .ant-menu-submenu-title {
    &::after {
      display: none;
    }
    svg path {
      fill: #fff;
    }
  }

  .ant-menu-item-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  }
  .ant-menu-item-active::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal > .ant-menu-item::after {
    transition: unset !important;
  }
`
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .user-information {
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    .user-name {
      font-weight: 600;
      color: ${({ theme }) => theme.white};
      margin-bottom: 8px;
      width: max-content;
      line-height: 1;
    }

    .user-role {
      color: ${({ theme }) => theme.white};
      font-size: 13px;
      margin-bottom: 0px;
      text-align: right;
      line-height: 1;
    }
  }

  .style-avt {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .notification_count {
    svg path {
      stroke: #a3a33a;
    }
  }
  .div-notification_count {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const MenuSelect = styled(Menu)`
  position: absolute;
  top: 12px;
  width: 500px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  .search-input {
    padding: 6px 16px;
    border-bottom: 2px solid #ddd;
    margin-bottom: 6px;
    position: sticky;
    top: -3px;
    background-color: #fff;
    z-index: 2;
    .ant-input {
      height: 32px;
    }
  }
  .ant-dropdown-menu-item {
    padding: 6px 16px;
  }
`
