import { Modal } from "antd"
import styled from "styled-components"

export const ModalWrapper = styled.div`
  .textTitle {
    margin-bottom: 3px;
    text-align: center;
  }

  .textValue {
    margin-bottom: 32px;
    text-align: center;
  }

  .trashCan {
    margin-top: 8px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    svg {
      width: 80px;
      height: 80px;
    }
  }
  .ant-modal-confirm-btns {
    justify-content: center;
  }
  .ant-modal-body {
    background-color: red;
  }
  .ant-btn-primary {
    background-color: red;
  }
`

export const ModalStyled = styled(Modal)`
  background-color: red;
  .ant-modal-confirm-btns {
    justify-content: center;
  }
  .ant-modal-confirm-body {
    display: block;
  }

`
