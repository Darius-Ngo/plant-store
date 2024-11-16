import useDeviceType from "src/lib/useDeviceType"
import styled from "styled-components"

const LayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  /* width: auto; */
  margin: auto;
  height: 100%;
  padding: 0px 20px;
  .content {
    width: 100%;
  }
  &.layout-mobile {
    width: 100%;
    padding: 0 12px;
  }
`
const LayoutCommon = props => {
  const { isMobile } = useDeviceType()
  return (
    <LayoutStyled className={isMobile ? "layout-mobile" : ""}>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutStyled>
  )
}

export default LayoutCommon
