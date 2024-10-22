import { Col, Row } from "antd"
import AntButton from "antd/lib/button"
import isEmpty from "lodash/isEmpty"
import PropTypes from "prop-types"
import SvgIcon from "src/components/SvgIcon"
import cn from "src/lib/classnames"
import styles from "./styles.module.scss"

export default function Button(props) {
  const dataProps = { ...props }
  const {
    iconName,
    children,
    btnType,
    className,
    clsName,
    size,
    minWidthDefault,
    disabled,
    onClick,
    alowDisabled,
    styleIcon,
    fill,
  } = props
  delete dataProps.btnType
  delete dataProps.className
  delete dataProps.clsName
  delete dataProps.iconName
  delete dataProps.size
  delete dataProps.minWidthDefault
  delete dataProps.disabled
  delete dataProps.onClick
  delete dataProps.alowDisabled

  return (
    <AntButton
      className={cn(styles.buttonWrapper, {
        [styles[btnType]]: !!btnType,
        [styles[clsName]]: !!clsName,
        [className]: !!className,
        [styles.minWidth]: minWidthDefault,
        [styles.disable]: disabled,
      })}
      size={size}
      onClick={!disabled ? onClick : () => {}}
      disabled={alowDisabled}
      {...dataProps}
    >
      <Row gutter={5} className="align-items-center f-no-wrap">
        {!isEmpty(iconName) && (
          <Col>
            <SvgIcon
              name={iconName}
              fill={fill}
              className={cn(styles.icon, { [styles.iconLarge]: styleIcon })}
            />
          </Col>
        )}
        {!isEmpty(children) && (
          <Col>
            {" "}
            <span className={cn(styles.name, { "ml-8": !!iconName })}>
              {children}
            </span>
          </Col>
        )}
      </Row>
    </AntButton>
  )
}

Button.defaultProps = {
  children: null,
  iconName: "",
  btnType: "",
  className: "",
  size: "large",
  minWidthDefault: true,
  disabled: false,
  onClick: () => {},
  alowDisabled: false,
}

Button.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.string,
  btnType: PropTypes.oneOf([
    "primary",
    "secondary",
    "green",
    "third",
    "btn-circle",
    "svg-24",
    "orange",
    "gray",
    "dark",
    "fourth",
    "fifth",
    "primaryFilter",
    "closeVND",
    "danger",
    "svg-18",
    "third-st",
    "red",
    "linear",
    "red-style",
    "green-style",
    "disable-style",
  ]),
  className: PropTypes.string,
  size: PropTypes.string,
  minWidthDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  alowDisabled: PropTypes.bool,
}
