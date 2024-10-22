import { UserOutlined } from "@ant-design/icons"
import { Avatar, Empty, Modal, Spin } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NotifyApi from "src/services/NotifyService"
import { WrapNotify, WrapNotifyItem } from "./styled"
import CB1 from "src/components/Modal/CB1"
import Notice from "src/components/Notice"

const NotifyForm = ({ listNotify, loading, getList, onClose }) => {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const handleReadAll = () => {
    setLoading(true)
    NotifyApi.MarkAsRead("")
      .then(res => {
        if (res.isError) return
        getList("")
        onClose()
      })
      .finally(() => setLoading(false))
  }

  const handleDeleteAll = () => {
    onClose()
    CB1({
      title: "Bạn có chắc chắn muốn xóa tất cả thông báo không?",
      icon: "trashRed",
      okText: "Đồng ý",
      onOk: () => {
        setLoading(true)
        NotifyApi.DeleteNotifyForUser("")
          .then(res => {
            if (res.isError) return
            getList("")
            Notice({
              msg: "Xóa thành công!",
            })
          })
          .finally(() => setLoading(false))
      },
    })
  }

  const handleClick = notify => {
    setLoading(true)
    NotifyApi.MarkAsRead(notify?.NotifyId)
      .then(res => {
        if (res.isError) return
        getList("")
      })
      .finally(() => setLoading(false))
    onClose()
    switch (notify?.Type) {
      default:
        break
    }
  }

  return (
    <WrapNotify>
      <Spin spinning={loading || isLoading}>
        <div className="container">
          <div className="header-notify">
            <div className="title">Thông báo</div>
            <div className="d-flex">
              <div className="link-name d-flex" onClick={handleReadAll}>
                Đánh dấu đã đọc
              </div>
              <div className=" link-name ml-20" onClick={handleDeleteAll}>
                <span>Xoá tất cả</span>
              </div>
            </div>
          </div>

          <div className="wrap-tabs">
            <div className="body-notify">
              {(!!listNotify ? listNotify?.length : 0) > 0 ? (
                <>
                  <div className="pr-12 pl-12 pt-4 pb-4 text-align-start fw-600">
                    Mới
                  </div>
                  {listNotify?.map(notify => (
                    <NotifyItem
                      notify={notify}
                      key={notify?.NotifyId}
                      handleClick={() => handleClick(notify)}
                    />
                  ))}
                </>
              ) : (
                <Empty
                  className="mt-30 mb-30"
                  description={"Chưa có thông báo nào!"}
                  style={{ paddingBottom: 24 }}
                />
              )}
            </div>
          </div>
        </div>
      </Spin>
    </WrapNotify>
  )
}
export default NotifyForm

const NotifyItem = ({ notify, handleClick, key }) => {
  return (
    <WrapNotifyItem
      className={!notify?.IsRead ? "unread" : ""}
      onClick={handleClick}
      key={key}
    >
      <div className="avatar">
        <Avatar
          size={46}
          src={notify?.Logo}
          className="style-avt"
          icon={<UserOutlined style={{ fontSize: 24 }} />}
        />
      </div>
      <div className="content-notify max-line2">
        <div>
          {notify?.Title} "
          <b>{`${notify?.AccountName} - ${notify?.Content}`}</b>"
        </div>
        <div className="time">{notify?.TimeAgo}</div>
      </div>
    </WrapNotifyItem>
  )
}
