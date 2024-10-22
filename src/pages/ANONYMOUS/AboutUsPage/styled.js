import styled from "styled-components"

export const AboutUsPageStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  .about-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // padding: 2rem 3rem;
    & > * {
      width: 50%;
    }
    img {
      height: 100%;
    }
    .title {
      display: block;
      font-size: 45px;
      line-height: 55px;
      font-weight: bold;
      color: #53382c;
      text-transform: uppercase;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color: #f1bc7a;
      }
    }
    .content {
      font-weight: bold;
      margin-top: 8px;
      margin-bottom: 1rem;
    }
    .description {
      margin-bottom: 2rem;
    }
    .description,
    .content {
      font-size: 15px;
      line-height: 23px;
      overflow: hidden;
    }
    .btn-view {
      font-size: 1rem;
      font-weight: 500;
      background-color: transparent;
      padding: 0.5rem 3rem;
      color: #ad4e00;
      border: 1px solid #ad4e00;
      border-radius: 6px;
      transition: all ease 0.4s;
      cursor: pointer;
      &:hover {
        background-color: #820014;
        color: #fff;
      }
    }

    &.row-1 {
      height: 410px;
      background-color: #fff;
      .content-left {
        padding-left: 3rem;
        padding-right: 1rem;
      }
      .img-right {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: -moz-linear-gradient(
            left,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 59%,
            rgba(255, 255, 255, 0) 100%
          );
          background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 59%,
            rgba(255, 255, 255, 0) 100%
          );
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 59%,
            rgba(255, 255, 255, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
      }
    }

    &.row-2 {
      height: 412px;
      background-color: #bd945d;

      .img-left {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: -moz-linear-gradient(
            left,
            rgba(255, 255, 255, 0) -1%,
            rgba(255, 255, 255, 0) 0%,
            rgba(222, 201, 173, 0) 50%,
            rgba(192, 152, 100, 1) 95%,
            rgba(189, 148, 93, 1) 99%
          );
          background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 0) -1%,
            rgba(255, 255, 255, 0) 0%,
            rgba(222, 201, 173, 0) 50%,
            rgba(192, 152, 100, 1) 95%,
            rgba(189, 148, 93, 1) 99%
          );
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) -1%,
            rgba(255, 255, 255, 0) 0%,
            rgba(222, 201, 173, 0) 50%,
            rgba(192, 152, 100, 1) 95%,
            rgba(189, 148, 93, 1) 99%
          );
          z-index: 1;
          pointer-events: none;
        }
      }
      .content-right {
        text-align: right;
        color: #fff;
        padding-left: 1rem;
        padding-right: 3rem;
        .title {
          color: #fff;
          &:hover {
            color: #f1bc7a;
          }
        }
        .btn-view {
          color: #fff;
          border: 1px solid #fff;
          &:hover {
            color: #820014;
            background-color: #fff;
          }
        }
      }
    }

    &.row-3 {
      height: 365px;
      background-color: #8e5a2d;

      .img-right {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: -moz-linear-gradient(
            left,
            rgba(142, 90, 45, 1) 0%,
            rgba(194, 166, 142, 0) 46%,
            rgba(255, 255, 255, 0) 100%
          );
          background: -webkit-linear-gradient(
            left,
            rgba(142, 90, 45, 1) 0%,
            rgba(194, 166, 142, 0) 46%,
            rgba(255, 255, 255, 0) 100%
          );
          background: linear-gradient(
            to right,
            rgba(142, 90, 45, 1) 0%,
            rgba(194, 166, 142, 0) 46%,
            rgba(255, 255, 255, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
      }
      .content-left {
        color: #fff;
        padding-right: 1rem;
        padding-left: 3rem;
        .title {
          color: #fff;
          &:hover {
            color: #f1bc7a;
          }
        }
        .btn-view {
          color: #fff;
          border: 1px solid #fff;
          &:hover {
            color: #820014;
            background-color: #fff;
          }
        }
      }
    }
  }
`
export const AboutUsDetailStyle = styled.div`
  .other-item {
    position: relative;
    margin-bottom: 24;

    .title {
      position: absolute;
      top: 180px;
      left: 0;
      right: 0;
      font-size: 26px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
`
