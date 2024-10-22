import { Button, Col, Row } from "antd"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import SvgIcon from "src/components/SvgIcon"
import AuthService from "src/services/AuthService"
import styled from "styled-components"

const Styled = styled.div`
  .box {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    display: flex;
    padding: 14px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: auto !important;
  }
`
const FormLoginSocial = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    var e = document.createElement("script")
    e.async = true
    e.src = document.location.protocol + "//connect.facebook.net/en_US/all.js"
    document.getElementById("fb-root")?.appendChild(e)
  }, [])

  const loginGG = async () => {
    try {
      setLoading(true)
      const res = await AuthService.loginGG()
      if (res?.isError) return
      window.location.replace(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const loginFB = async () => {
    try {
      setLoading(true)
      const res = await AuthService.loginFB()
      if (res?.isError) return
      window.location.replace(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const loginLinked = async () => {
    try {
      setLoading(true)
      const res = await AuthService.loginLinked()
      if (res?.isError) return
      window.location.replace(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Styled>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Button className="box" onClick={loginFB} disabled={loading}>
            <SvgIcon name="login-facebook" />
            <div className="ml-16">Facebook</div>
          </Button>
        </Col>
        <Col span={12}>
          <Button className="box" onClick={loginGG} disabled={loading}>
            <SvgIcon name="login-google" />
            <div className="ml-16">Google</div>
          </Button>
        </Col>
        <Col span={24}>
          <Button className="box" onClick={loginLinked} disabled={loading}>
            <SvgIcon name="linked-in" />
            <div className="ml-16">Linkedin</div>
          </Button>
        </Col>
      </Row>
    </Styled>
  )
}

export default FormLoginSocial
