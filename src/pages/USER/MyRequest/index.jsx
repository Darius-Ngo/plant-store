import { Select, Space, Spin, Tooltip } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { STATUS_REQUEST } from "src/constants/constants"
// import { statusColor } from "src/pages/ADMIN/RequestSupport"
import RequestSupportService from "src/services/RequestSupportService"
import { MyRequestStyle } from "./styled"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import ModalAddRequest from "./components/ModalAddRequest"

const MyRequest = () => {
  const { userInfo } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    id_nguoi_dung: userInfo.id,
    status: 0,
    currentPage: 1,
    pageSize: 10,
    textSearch: "",
  })

  const getListRequest = async () => {
    try {
      setLoading(true)
      const res = await RequestSupportService.getListRequest(pagination)
      if (res.isError) return
      setListData(res.Object?.data)
      setTotal(res.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListRequest()
  }, [pagination])

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      width: 60,
      align: "center",
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.pageSize * (pagination.currentPage - 1)}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Mã yêu cầu</MainTableHeader>
          <SubTableHeader>Thời gian yêu cầu</SubTableHeader>
        </div>
      ),
      dataIndex: "ma_yc",
      width: 160,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData className="max-line1">{text}</MainTableData>
          <SubTableData>
            {record.thoi_gian_yc
              ? dayjs(record.thoi_gian_yc).format("HH:mm DD/MM/YYYY")
              : ""}
          </SubTableData>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Người hỗ trợ</MainTableHeader>
          <SubTableHeader>Thời gian hỗ trợ</SubTableHeader>
        </div>
      ),
      dataIndex: "ten_nguoi_ht",
      width: 180,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData>{text || ""}</MainTableData>
          <SubTableData>
            {!!record.thoi_gian_ht
              ? dayjs(record.thoi_gian_ht).format("HH:mm DD/MM/YYYY")
              : "Chưa hỗ trợ"}
          </SubTableData>
        </div>
      ),
    },

    {
      title: "Vấn đề cần hỗ trợ",
      dataIndex: "van_de_ht",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line2">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "phan_hoi",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line2">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      align: "center",
      width: 150,
      render: (value, record) => (
        <div className="text-center">
          <div
            // style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
          >
            {
              STATUS_REQUEST?.find(item => item?.CodeValue === value)
                ?.Description
            }
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {!!record?.list_btns?.cap_nhat && (
              <ButtonCircle
                title="Chỉnh sửa"
                iconName="edit"
                onClick={() =>
                  setOpenModalAdd({
                    ...record,
                    isEdit: true,
                  })
                }
              />
            )}
            {!!record?.list_btns?.huy && (
              <ButtonCircle
                title="Hủy yêu cầu"
                iconName="cancel"
                onClick={() => {
                  CB1({
                    record,
                    title: `Bạn có chắc chắn muốn hủy yêu cầu mã  
                    "<strong> ${record?.ma_yc}</strong>" không?`,
                    icon: "cancel",
                    okText: "Đồng ý",
                    onOk: async close => {
                      try {
                        setLoading(true)
                        const res = await RequestSupportService.deleteRequest({
                          id_yc: record?.id,
                        })
                        if (res.isError) return
                        Notice({ msg: "Xóa yêu cầu thành công." })
                        getListRequest()
                      } finally {
                        setLoading(false)
                      }
                      close()
                    },
                  })
                }}
              />
            )}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]

  return (
    <LayoutCommon>
      <Spin spinning={loading}>
        <MyRequestStyle>
          <div className="d-flex justify-content-space-between title-page mb-24">
            <div className="text-uppercase d-flex align-items-flex-end">
              Danh sách yêu cầu
            </div>
            <Space size={12}>
              <FlInput
                label="Tìm kiếm yêu cầu hỗ trợ"
                search
                style={{ width: 450 }}
                onSearch={textSearch =>
                  setPagination({
                    ...pagination,
                    currentPage: 1,
                    textSearch,
                  })
                }
              />
              <FlSelect
                label="Trạng thái"
                style={{ width: 200 }}
                showSearch
                value={pagination?.status}
                onChange={status =>
                  setPagination({
                    ...pagination,
                    currentPage: 1,
                    status,
                  })
                }
              >
                <Select.Option key={0} value={0}>
                  Tất cả
                </Select.Option>
                {STATUS_REQUEST.map(i => (
                  <Select.Option key={i?.CodeValue} value={i?.CodeValue}>
                    {i?.Description}
                  </Select.Option>
                ))}
              </FlSelect>
              <Button btnType="orange" onClick={() => setOpenModalAdd(true)}>
                Yêu cầu mới
              </Button>
            </Space>
          </div>
          <TableCustom
            dataSource={listData}
            columns={columns}
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            pagination={{
              hideOnSinglePage: total <= 10,
              current: pagination?.currentPage,
              pageSize: pagination?.pageSize,
              responsive: true,
              total: total,
              locale: { items_per_page: "" },
              showSizeChanger: total > 10,
              onChange: (page, pageSize) => {
                setPagination({
                  ...pagination,
                  currentPage: page,
                  pageSize: pageSize,
                })
              },
            }}
            rowKey="id"
            scroll={{ x: "600px", y: "calc(100vh - 240px)" }}
          />
        </MyRequestStyle>
      </Spin>
      {!!openModalAdd && (
        <ModalAddRequest
          open={openModalAdd}
          onCancel={() => setOpenModalAdd(false)}
          onOk={getListRequest}
        />
      )}
    </LayoutCommon>
  )
}

export default MyRequest
