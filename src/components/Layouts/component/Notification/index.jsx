import { Badge, Col, Dropdown } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SvgIcon from "src/components/SvgIcon"
import NotifyService from "src/services/NotifyService"
import NotifyForm from "./components/NotifyForm"

const Notification = () => {
  const { userInfo } = useSelector(state => state?.appGlobal)
  // const navigate = useNavigate()
  // const [connection, setConnection] = useState(null)
  const [listNotify, setListNotify] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState(0)

  const getListNotify = (TextSearch = "") => {
    setLoading(true)
    let params = {}
    if (TextSearch) {
      params = { TextSearch: TextSearch }
    }
    NotifyService.GetListNotify(params)
      .then(res => {
        if (res?.isError) return
        setListNotify(res?.Object)
      })
      .finally(() => setLoading(false))
  }
  const getNewNotification = () => {
    NotifyService.GetNewNotification().then(res => {
      if (res.isError) return
      res?.Object?.forEach(item => {
        if (item.UserId === userInfo?.UserID) {
          setNumberOfNewNotifies(item.NumberUnseen)
        }
      })
    })
  }
  // useEffect(() => {
  //   if (userInfo?.UserID) {
  //     getNewNotification()
  //     getListNotify("")
  //   }
  // }, [userInfo])

  // useEffect(() => {
  //   const RESTFUL_BASE_URL = window?.env?.API_WS || ""
  //   const connect = new HubConnectionBuilder()
  //     .withUrl(
  //       `${RESTFUL_BASE_URL}/signalrServer?Authorization=` +
  //         encodeURIComponent(userInfo?.Token),
  //       {
  //         headers: {
  //           Authorization: userInfo?.Token,
  //           MaintenanceModeCode: getStorage(STORAGE.MAINTENANCE_CODE),
  //         },
  //       },
  //     )
  //     .withAutomaticReconnect()
  //     .build()
  //   setConnection(connect)
  // }, [])
  // useEffect(() => {
  //   if (connection) {
  //     connection.start().catch(error => {})
  //     connection.on("NotifyMessage", message => {
  //       if (!!message.data) {
  //         message.data.forEach(item => {
  //           if (item.userId === userInfo.UserID) {
  //             if (item.numberUnseen > 0) {
  //               getListNotify("")
  //               setNumberOfNewNotifies(item.numberUnseen)
  //             }
  //           }
  //         })
  //       }
  //     })
  //   }
  // }, [connection])

  return (
    <Dropdown
      overlay={
        <NotifyForm
          getList={textSearch => getListNotify(textSearch)}
          listNotify={listNotify}
          loading={loading}
          onClose={() => setVisible(false)}
        />
      }
      onOpenChange={setVisible}
      open={visible}
      trigger={["click"]}
    >
      <Col
        className="pointer"
        onClick={() => {
          if (numberOfNewNotifies > 0) {
            setNumberOfNewNotifies(0)
            setLoading(true)
            NotifyService.MarkAsSeen("")
              .then(res => {
                if (res.isError) return
                getListNotify("")
              })
              .finally(() => setLoading(false))
          }
        }}
      >
        <div className="wrap-icon">
          <Badge
            count={numberOfNewNotifies}
            overflowCount={10}
            size="small"
            className="notification_count"
          >
            <SvgIcon name="bell-blue" />
          </Badge>
        </div>
      </Col>
    </Dropdown>
  )
}

export default Notification
