import {
  Col,
  ConfigProvider,
  Form,
  Image,
  Radio,
  Row,
  Spin,
  Upload,
} from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import { getRegexPhoneNumber } from "src/lib/stringsUtils"
import { formatMoneyVND, normFile } from "src/lib/utils"
import { setListCart } from "src/redux/appGlobal"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import OrderService from "src/services/OrderService"
import { InfoOrderStyle } from "../styled"
import ModalSelectAddress from "./ModalSelectAddress"
// import { ButtonUploadStyle } from "src/pages/ADMIN/EmployeeManager/styled"
// import FileService from "src/services/FileService"

const InfoOrder = ({ listProduct, userInfo, totalMoney }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)
  const [addressSelect, setAddressSelect] = useState(false)
  const [typePay, setTypePay] = useState(1)
  const [imgQR, setImgQR] = useState("")
  const [maDon, setMaDonHang] = useState("")
  const handleLoadQR = async () => {
    const ma_don = Date.now().toString()
    setMaDonHang(ma_don)
    setLoading(true)
    OrderService.getQR({
      accountNo: 39393696789,
      accountName: "Tiem cafe bat on",
      acqId: 970423,
      addInfo: `Thanh toan tien don hang ${ma_don}`, // ${open.ProfileType}
      amount: totalMoney,
      format: "text",
      template: "my5OhSW",
    })
      .then(async res => {
        if (res.data.code === "00") {
          setImgQR(res.data.data.qrDataURL)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const getListAddress = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListAddressOrder({
        id_nguoi_dung: userInfo.id,
      })
      if (res.isError) return
      if (res.Object?.length) {
        setAddressSelect(res.Object[0])
      } else {
        setAddressSelect({
          ten_nguoi_nhan: userInfo.ho_ten,
          sdt_nguoi_nhan: userInfo.sdt,
          id_tp: userInfo.id_tp,
          id_qh: userInfo.id_qh,
          id_xp: userInfo.id_xp,
          dia_chi_chi_tiet: userInfo.thon_xom,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async () => {
    try {
      const values = await form.validateFields()
      let resImg
      if (typePay === 2) {
        const formData = new FormData()
        values?.ImgTransfer?.map(i =>
          formData.append("fileList", i.originFileObj),
        )
        // resImg = await FileService.uploadListFile(formData)
      }
      setLoading(true)
      const res = await OrderService.addOrder({
        ...values,
        id_nguoi_dat: userInfo.id,
        kieu_thanh_toan: typePay,
        tong_tien: totalMoney,
        ds_san_pham: listProduct,
        ma_don: typePay === 2 ? maDon : undefined,
        chung_tu_tt: typePay === 2 ? resImg?.Object?.toString() : "",
      })
      if (res.isError) return
      getListCart()
      Notice({
        msg: "Đặt hàng thành công.",
      })
      navigate(ROUTER.DS_SAN_PHAM)
    } finally {
      setLoading(false)
    }
  }
  const getListCart = async () => {
    try {
      setLoading(true)
      const res = await CartService.getListCart(userInfo.id)
      dispatch(setListCart(res.data || []))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListAddress()
  }, [])
  useEffect(() => {
    form.setFieldsValue(addressSelect)
  }, [addressSelect])
  useEffect(() => {
    if (typePay === 2) handleLoadQR()
  }, [typePay])
  return (
    <Spin spinning={loading}>
      <InfoOrderStyle>
        <Form layout="vertical" form={form} initialValues={addressSelect}>
          <Row gutter={24}>
            <Col span={16} className="pb-16">
              <div
                className="fs-16 fw-600 mb-16 pb-12 text-uppercase d-flex justify-content-space-between align-items-flex-end"
                style={{ borderBottom: "2px solid #ddd" }}
              >
                Thông tin đặt hàng
                <Button
                  btnType="orange-third"
                  className="d-flex align-items-center"
                  onClick={() => setOpenModalAddress(true)}
                >
                  Địa chỉ đã lưu
                </Button>
              </div>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="fw-600 mb-12">Thông tin người nhận</div>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Tên người nhận không được để trống!",
                      },
                    ]}
                    name={"ten_nguoi_nhan"}
                  >
                    <FlInput label="Tên người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "SĐT người nhận không được để trống!",
                      },
                      {
                        pattern: getRegexPhoneNumber(),
                        message: "Số điện thoại sai định dạng",
                      },
                    ]}
                    name={"sdt_nguoi_nhan"}
                  >
                    <FlInput label="SĐT người nhận" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Địa chỉ nhận hàng</div>
                </Col>
                <Col span={24}>
                  <SelectAddress
                    floating={true}
                    form={form}
                    required
                    initValue={
                      addressSelect
                        ? {
                            id_tp: addressSelect?.id_tp,
                            id_qh: addressSelect?.id_qh,
                            id_xp: addressSelect?.id_xp,
                          }
                        : {}
                    }
                    listFormName={["id_tp", "id_qh", "id_xp"]}
                  />
                </Col>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ chi tiết không được để trống!",
                      },
                    ]}
                    name={"dia_chi_chi_tiet"}
                  >
                    <FlInput label="Địa chỉ chi tiết" isRequired />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="fw-600 mb-12">Ghi chú cho cửa hàng</div>
                </Col>
                <Col span={24}>
                  <Form.Item name={"ghi_chu"}>
                    <FlInput textArea label="Ghi chú" style={{ height: 120 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              span={8}
              style={{ borderLeft: "1px solid #ddd", height: "auto" }}
            >
              <div className="mb-24">
                <div
                  className="fs-14 fw-600 pb-12 pr-16 text-uppercase mb-12 d-flex align-items-flex-end justify-content-space-between"
                  style={{ borderBottom: "2px solid #ddd", height: 50 }}
                >
                  <span>SẢN PHẨM</span>
                  <span>GIÁ</span>
                </div>
                {listProduct.map(i => (
                  <div
                    className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-6 pr-12"
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <div className="d-flex align-items-flex-end">
                      <Image
                        src={i?.anh}
                        width={50}
                        alt={i.ten_san_pham}
                        preview={false}
                      />
                      <div>
                        <div
                          style={{ color: "var(--color-brown-dark)" }}
                          className="fw-600 fs-13"
                        >
                          {i.ten_san_pham}
                        </div>
                        <div
                          className="fs-11 mt-4"
                          style={{ color: "var(--color-yellow)" }}
                        >
                          {i?.size},{" "}
                          <span className="fs-13">x{i.so_luong}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="fw-600"
                      style={{
                        color: "var(--color-yellow)",
                      }}
                    >
                      {formatMoneyVND(i.so_luong * i.gia_ban)}
                    </div>
                  </div>
                ))}
                <div
                  className="d-flex align-items-flex-end justify-content-space-between pt-12 pb-12 pr-12 fs-16"
                  style={{
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <div className="fw-600">Tổng</div>
                  <div
                    className="fw-600"
                    style={{
                      color: "var(--color-orange)",
                    }}
                  >
                    {formatMoneyVND(totalMoney)}
                  </div>
                </div>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      colorPrimary: "var(--color-orange)",
                    },
                  },
                }}
              >
                <Radio.Group
                  onChange={e => setTypePay(e.target.value)}
                  value={typePay}
                  className="radio-user mb-12"
                >
                  <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                  <Radio value={2}>Thanh toán trực tuyến</Radio>
                </Radio.Group>
              </ConfigProvider>
              {typePay === 2 && imgQR && (
                <>
                  <Image
                    src={imgQR}
                    // width={"auto"}
                    style={{ width: "100%" }}
                    preview={false}
                  />
                  <Form.Item
                    label="Chứng từ thanh toán"
                    name="ImgTransfer"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "Chứng từ thanh toán không được để trống!",
                      },
                      // () => ({
                      //   validator(_, value) {
                      //     if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                      //       return Promise.reject(
                      //         new Error("Dung lượng file tối đa 5MB"),
                      //       )
                      //     }
                      //     return Promise.resolve()
                      //   },
                      // }),
                    ]}
                  >
                    <Upload
                      accept="image/*, .pdf"
                      multiple={true}
                      // maxCount={1}
                      beforeUpload={() => false}
                      listType="picture-card"
                    >
                      <Row className="align-items-center">
                        {/* <ButtonUploadStyle>
                          <Button className="account-button-upload ">
                            <Row className="account-background-upload d-flex align-items-center">
                              <SvgIcon name="add-media-video" />
                              <div className="account-text-upload ml-16">
                                Chọn ảnh
                              </div>
                            </Row>
                          </Button>
                        </ButtonUploadStyle> */}
                      </Row>
                    </Upload>
                  </Form.Item>
                </>
              )}

              <Button
                btnType="orange"
                className="w-100 d-flex align-items-center"
                onClick={handleOrder}
              >
                ĐẶT HÀNG
              </Button>
            </Col>
          </Row>
        </Form>
      </InfoOrderStyle>
      {openModalAddress && (
        <ModalSelectAddress
          open={openModalAddress}
          onCancel={() => {
            setOpenModalAddress(false)
          }}
          handleOk={() => getListAddress()}
          userInfo={userInfo}
          setAddressSelect={setAddressSelect}
          addressSelect={addressSelect}
        />
      )}
    </Spin>
  )
}

export default InfoOrder
