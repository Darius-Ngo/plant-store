import { Select } from "antd"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"

import SvgIcon from "src/components/SvgIcon"
import { generateRandomString } from "src/lib/stringsUtils"

import { OPTION_ALL_LABEL, OPTION_ALL_VALUE } from "src/constants/constants"

import FloatingLabel from "../index"
import { TreeSelectWrapper } from "../styled"
import styles from "./styles.module.scss"

export default function FlSelect(props) {
  const dataProps = { ...props }
  const {
    label,
    isRequired,
    className,
    onChange,
    children,
    onFocus,
    onBlur,
    value,
    showOptionAll,
    optionAllValue,
    showSearch,
    bgcolor,
  } = props
  const [count, setCount] = useState(1)
  const [isFocus, setIsFocus] = useState(false)
  const [isFocusSelect, setIsFocusSelect] = useState(false)
  delete dataProps.label
  delete dataProps.className
  delete dataProps.isRequired
  delete dataProps.onChange
  delete dataProps.onFocus
  delete dataProps.onBlur
  delete dataProps.showOptionAll

  const randomClass = generateRandomString()

  const optionAllVal =
    optionAllValue !== undefined ? optionAllValue : OPTION_ALL_VALUE

  useEffect(() => {
    const valueField = document.querySelector(
      `.h_input_${randomClass} .ant-select-selection-item`,
    )

    if (!!value || valueField?.value) {
      setIsFocus(true)
    } else {
      setIsFocus(false)
    }
  }, [value])

  return (
    <TreeSelectWrapper
      isFocus={isFocusSelect}
      bgcolor={bgcolor}
      className={`${className} ${styles.fieldWrapper} h_input_${randomClass} floating-label`}
    >
      <FloatingLabel
        isFocus={isFocus}
        bgcolor={bgcolor}
        label={label}
        isRequired={isRequired}
      >
        <Select
          onChange={(value, option) => {
            if (value === undefined && showOptionAll) {
              value = optionAllVal
            }
            if (value == null) setCount(count + 1)
            if (value === undefined) setIsFocus(false)
            onChange(value, option)
          }}
          onFocus={() => {
            setIsFocus(true)
            setIsFocusSelect(true)
            onFocus()
          }}
          onBlur={() => {
            const valueField = document.querySelector(
              `.h_input_${randomClass} .ant-select-selection-item`,
            )
            if (!!value || valueField?.value) {
              setIsFocus(true)
              setIsFocusSelect(true)
            } else {
              setIsFocus(false)
              setIsFocusSelect(false)
            }
            onBlur()
          }}
          key={count}
          showSearch={showSearch || children?.length > 10}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          suffixIcon={<SvgIcon name="arrow-down" />}
          {...dataProps}
        >
          {showOptionAll && (
            <Select.Option value={optionAllVal}>
              {OPTION_ALL_LABEL}
            </Select.Option>
          )}
          {children}
        </Select>
      </FloatingLabel>
    </TreeSelectWrapper>
  )
}

FlSelect.propTypes = {
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  showSearch: PropTypes.bool,
}

FlSelect.defaultProps = {
  isRequired: false,
  children: null,
  className: "",
  onChange: null,
  onFocus: () => {},
  onBlur: () => {},
  showSearch: false,
}
