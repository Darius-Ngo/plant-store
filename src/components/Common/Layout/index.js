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
`
const LayoutCommon = props => {
  return (
    <LayoutStyled>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutStyled>
  )
}

export default LayoutCommon
