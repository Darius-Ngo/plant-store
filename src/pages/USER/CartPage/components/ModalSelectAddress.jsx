import { Divider, Dropdown, Empty, Radio, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import OrderService from "src/services/OrderService"
import ModalAddNewAddress from "./ModalAddNewAddress"
import { MoreOutlined } from "@ant-design/icons"
import CB1 from "src/components/Modal/CB1"

const ModalSelectAddress = ({
  open,
  onCancel,
  userInfo,
  handleOk,
  addressSelect,
  setAddressSelect,
}) => {
  const [loading, setLoading] = useState(false)
  const [listAddressUser, setListAddressUser] = useState([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const getListAddress = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getListAddressOrder({
        id_nguoi_dung: userInfo.id,
      })
      if (res.isError) return
      setListAddressUser(res.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListAddress()
  }, [])
  const items = record => {
    return [
      {
        key: "1",
        label: "Cập nhật",
        onClick: () =>
          setOpenModalAdd({
            ...record,
            isEdit: true,
          }),
      },
      {
        key: "2",
        label: <div style={{ color: "red" }}>Xóa</div>,
        onClick: () => {
          CB1({
            title: `Bạn có chắc chắn muốn xóa địa chỉ này không?`,
            icon: "trashRed",
            okText: "Đồng ý",
            onOk: () => {
              setLoading(true)
              OrderService.deleteAddress({
                idAddress: [record.id],
              })
                .then(res => {
                  if (res.isError) return
                  if (record.id === addressSelect.id) {
                    handleOk()
                    setAddressSelect({})
                  }
                  getListAddress()
                })
                .finally(() => setLoading(false))
            },
          })
        },
      },
    ]
  }
  return (
    <CustomModal
      title={"Địa chỉ đã lưu"}
      width={700}
      isUser
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button btnType="gray-style" onClick={onCancel}>
            Đóng
          </Button>
          <Button btnType="orange" onClick={() => setOpenModalAdd(true)}>
            Thêm địa chỉ
          </Button>
        </div>
      }
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        {listAddressUser?.length ? (
          <Radio.Group
            onChange={e => {
              if (e.target.value === addressSelect?.id) return
              setAddressSelect(
                listAddressUser.find(i => i.id === e.target.value),
              )
              // onCancel()
            }}
            value={addressSelect?.id}
            className="radio-user mb-12 w-100"
          >
            {listAddressUser?.map((i, idx) => (
              <div key={i.id}>
                <div className="d-flex justify-content-space-between align-items-center">
                  <Radio value={i.id}>
                    <div className="pl-12 pr-8">
                      <div
                        className="d-flex fw-600"
                        style={{ color: "var(--color-brown)" }}
                      >
                        <div
                          className="mr-16"
                          // style={{ borderRight: "1px solid var(--color-brown)" }}
                        >
                          {i?.ten_nguoi_nhan}
                        </div>
                        -<div className="ml-16">{i?.sdt_nguoi_nhan}</div>
                      </div>
                      <div>{i.dia_chi_nhan_hang}</div>
                    </div>
                  </Radio>
                  <Dropdown
                    trigger={["click"]}
                    menu={{
                      items: items(i),
                    }}
                    placement="bottomLeft"
                  >
                    <MoreOutlined
                      style={{ color: "red" }}
                      className="fs-20 mr-12 pointer"
                    />
                  </Dropdown>
                </div>
                {idx < listAddressUser.length - 1 && <Divider />}
              </div>
            ))}
          </Radio.Group>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"Bạn chưa lưu địa chỉ nào!"}
          />
        )}
      </Spin>
      {openModalAdd && (
        <ModalAddNewAddress
          open={openModalAdd}
          onCancel={() => setOpenModalAdd(false)}
          userInfo={userInfo}
          onOk={getListAddress}
        />
      )}
    </CustomModal>
  )
}

export default ModalSelectAddress
