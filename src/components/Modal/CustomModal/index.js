import PropTypes from "prop-types"
import cn from "src/lib/classnames"
import { ModalWrapper } from "./styled"

import "./style.scss"

export default function CustomModal(props) {
  const { children, className, hiddenScroll } = props

  return (
    <ModalWrapper
      width={1024}
      // style={{ top: "20%" }}
      {...props}
      className={className}
      hiddenScroll={hiddenScroll}
      maskTransitionName=""
    >
      {children}
    </ModalWrapper>
  )
}
CustomModal.propTypes = {
  tilteStart: PropTypes.bool,
  className: PropTypes.string,
  hiddenScroll: PropTypes.bool,
}

CustomModal.defaultProps = {
  tilteStart: true,
  hiddenScroll: false,
  className: "",
}
