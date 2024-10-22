import styled from "styled-components"

export const ContactStyled = styled.div`
  margin-top: 16px;
  .map-contact {
    iframe {
      width: 100% !important;
      height: 500px !important;
    }
  }
  .contact-box {
    background: #00c590;
    box-shadow: 0px 0px 20px rgba(21, 67, 152, 0.1);
    border-radius: 8px;
    padding-top: 3px;
    margin-bottom: 36px;
    &__hotline-background {
      background: #154398;
    }
    &__link-background {
      background: #f88c00;
    }
  }

  .hotline-text {
    font-weight: 600;
    font-size: 28px;
    line-height: 150%;
    color: #ed1117;
  }

  .contact-box-content {
    background: #ffffff;
    border-radius: 3px;
    padding: 20px;
  }
  .contact-type {
    font-weight: 600;
    font-size: 20px;
    line-height: 120%;
    color: #154398;

    &:before {
      color: #00c590;
      content: "\\2022";
      font-weight: 700;
      display: inline-block;
      width: 1em;
      margin-left: 0em;
      font-size: 20px;
      line-height: 1;
    }
  }
  .contact-address {
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    margin-top: 10px;
  }
  .select-styled {
    .ant-select-selector {
      height: 50px !important;
      padding: 7px 11px !important;
      background-color: #154398 !important;
    }
    .ant-select-arrow {
      color: #fff !important;
    }
    .ant-select-selection-placeholder {
      color: #ffffff;
      font-weight: 600;
    }
  }
`

export const ContactCardStyled = styled.div`
  .contact-card-box {
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(21, 67, 152, 0.1);
    border-radius: 4px;
  }
  .contact-card-header {
    background: #154398;
    border-radius: 4px 4px 0px 0px;
    padding: 20px 15px;
    color: #ffffff;
    font-weight: 600;
  }
  .contact-card-content {
    padding: 30px;
  }
  .contact-card-title {
    font-weight: 600;
    color: #000000;
  }
  .contact-card-text-content {
    color: #000000;
  }
`

export const FormContactStyled = styled.div`
  .form-contact-box {
    box-shadow: 0px 0px 20px rgba(21, 67, 152, 0.1);
    border-radius: 4px;
    padding: 30px;
  }
  .note-text {
    margin: 30px 0px;
  }
  .form-contact-submit {
    background: linear-gradient(90deg, #154398 0%, #ed1117 100%);
    border-radius: 4px;
    padding: 16px 50px;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  .ant-form-item-required {
    font-weight: 600;
  }
`
