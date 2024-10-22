import {
  Col,
  Divider,
  Image,
  Input,
  Rate,
  Row,
  Skeleton,
  Tooltip,
  Upload,
  message
} from "antd"
import { useEffect, useState } from "react"

import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { FAILBACK, SIZE_PRODUCT } from "src/constants/constants"
import { getBase64 } from "src/lib/utils"

// import ReactPlayer from "react-player"
import _ from "lodash"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Notice from "src/components/Notice"
// import { ButtonUploadStyle } from "src/pages/ADMIN/EmployeeManager/styled"
import FileService from "src/services/FileService"
import RateService from "src/services/RateService"
import { RateStyled } from "../styled"

const FileUpload = ({ file, onDelete }) => {
  const [base64, setBase64] = useState()
  useEffect(() => {
    getImageBase64(file)
  }, [file])

  const getImageBase64 = async file => {
    const res = file?.type?.includes("video")
      ? URL.createObjectURL(file)
      : await getBase64(file)
    setBase64(res)
  }

  return (
    <Col className="image-item">
      <div className="image-css">
        {!base64 ? (
          <Skeleton.Image active={true} />
        ) : file?.type?.includes("video") ? (
          // <ReactPlayer
          //   url={base64}
          //   width="100px"
          //   height="100px"
          //   playing={false}
          //   controls={true}
          // />
          <></>
        ) : (
          <Image
            width={100}
            src={base64}
            alt="Ảnh ="
            fallback={FAILBACK}
            placeholder={<Skeleton.Image width={100} active={true} />}
          />
        )}
      </div>
      <Row className="align-items-center justify-content-space-between mt-8">
        <span title={file?.name} className="max-line1" style={{ maxWidth: 70 }}>
          {file?.name}
        </span>
        <div className="pointer" onClick={onDelete}>
          <SvgIcon name="bin" />
        </div>
      </Row>
    </Col>
  )
}
const ModalRate = ({ open, listProduct, onCancel, onOk = () => {} }) => {
  const [loading, setLoading] = useState(false)
  const [listPro, setListPro] = useState([])
  const { userInfo } = useSelector(state => state.appGlobal)

  const customIcons = {
    1: (
      <Tooltip title="Rất tệ" color="yellow" mouseLeaveDelay={0}>
        <SvgIcon name="face-sad" />
      </Tooltip>
    ),
    2: (
      <Tooltip title="Tệ" color="yellow" mouseLeaveDelay={0}>
        <SvgIcon name="face-frown" />
      </Tooltip>
    ),
    3: (
      <Tooltip title="Bình thường" color="yellow" mouseLeaveDelay={0}>
        <SvgIcon name="face-meh" />
      </Tooltip>
    ),
    4: (
      <Tooltip title="Tốt" color="yellow" mouseLeaveDelay={0}>
        <SvgIcon name="face-smile" />
      </Tooltip>
    ),
    5: (
      <Tooltip title="Tuyệt vời" color="yellow" mouseLeaveDelay={0}>
        <SvgIcon name="face-grin-hearts" />
      </Tooltip>
    ),
  }

  useEffect(() => {
    if (open)
      setListPro(
        open?.list_product.map(i => ({
          ...i,
          ListImage: [],
          ListVideo: [],
        })),
      )
  }, [open])

  const handleChangeReview = (value, id) =>
    setListPro(
      listPro?.map(i => {
        if (i.id === id) {
          return {
            ...i,
            ...value,
          }
        } else return i
      }),
    )

  const onRate = async () => {
    try {
      setLoading(true)
      const listProductRate = await Promise.all(
        listPro?.map(async item => {
          let resImg
          let resVideo
          if (item?.ListImage?.length) {
            const formData = new FormData()
            item?.ListImage?.map(img => formData.append("fileList", img))
            resImg = await FileService.uploadListFile(formData)
          }
          if (item?.ListVideo?.length) {
            const formData = new FormData()
            item?.ListVideo?.map(video => formData.append("fileList", video))
            resVideo = await FileService.uploadListFile(formData)
          }
          if (resImg?.isError) return
          if (resVideo?.isError) return
          return {
            id_san_pham: item?.id_san_pham,
            danh_gia: item?.danh_gia,
            noi_dung: item?.noi_dung,
            kich_co_sp: item?.kich_co,
            anh_mo_ta: resImg?.Object || [],
            video_mo_ta: resVideo?.Object || [],
          }
        }),
      )
      RateService.rateOrder({
        id_nguoi_dung: userInfo?.id,
        id_don_hang: open.id,
        list_danh_gia: listProductRate,
      }).then(res => {
        if (res.isError) return
        onCancel()
        onOk()
        Notice({
          msg: "Đánh giá thành công.",
          isSuccess: true,
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const NoticeMess = _.debounce(Notice => message.warning(Notice), 500)

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="orange" onClick={onRate}>
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={false}
      open={!!open}
      onCancel={onCancel}
      footer={renderFooter()}
      width={800}
    >
      <SpinCustom spinning={loading}>
        <div className="title-page mb-8">Đánh giá</div>
        {listPro?.map((i, idx) => {
          return (
            <RateStyled key={i.id}>
              <div className="d-flex align-items-center">
                <img
                  alt=""
                  src={i?.anh}
                  width="60px"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <div
                    className="fw-600 max-line1"
                    style={{ color: "var(--color-brown)" }}
                    title={i?.ten_san_pham}
                  >
                    {i?.ten_san_pham}
                  </div>
                  <div className="">{SIZE_PRODUCT[i?.kich_co]}</div>
                </div>
              </div>
              <div className="rate">
                <Rate
                  // allowHalf
                  onChange={e => handleChangeReview({ danh_gia: e }, i?.id)}
                  character={({ index }) => customIcons[index + 1]}
                />
              </div>
              <Input.TextArea
                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm nhé."
                value={i?.noi_dung}
                onChange={e =>
                  handleChangeReview({ noi_dung: e?.target.value }, i?.id)
                }
                style={{ height: 150 }}
              />
              {/* <Row className="mt-16">
                <ButtonUploadStyle>
                  <Button className="account-button-upload">
                    <Upload
                      multiple
                      beforeUpload={(file, fileList) => {
                        const listFileFilter = fileList.filter(
                          file => !(file?.size > 5 * 1024 * 1024),
                        )
                        handleChangeReview(
                          {
                            ListImage: [...listFileFilter, ...i.ListImage],
                          },
                          i?.id,
                        )
                        if (fileList.length > listFileFilter.length) {
                          NoticeMess("Dung lượng file ảnh tối đa 5MB!")
                        }
                        return false
                      }}
                      accept=".png, .jpeg, .jpg, .bmp"
                      fileList={[]}
                    >
                      <Row className="account-background-upload d-flex align-items-center">
                        <SvgIcon name="small-image-red" />
                        <div className="account-text-upload ml-16">
                          Thêm ảnh
                        </div>
                      </Row>
                    </Upload>
                  </Button>
                </ButtonUploadStyle>
                <ButtonUploadStyle className="ml-10">
                  <Button className="account-button-upload ">
                    <Upload
                      multiple={false}
                      beforeUpload={(file, fileList) => {
                        if (file?.size > 10 * 1024 * 1024) {
                          message.warning("Dung lượng file video tối đa 10MB!")
                        } else {
                          handleChangeReview(
                            {
                              ListVideo: [file, ...i.ListVideo],
                            },
                            i?.id,
                          )
                        }
                        return false
                      }}
                      accept="video/mp4,video/x-m4v,video/*"
                      fileList={[]}
                    >
                      <Row className="account-background-upload d-flex align-items-center">
                        <SvgIcon name="add-media-video" />
                        <div className="account-text-upload ml-16">
                          Thêm video
                        </div>
                      </Row>
                    </Upload>
                  </Button>
                </ButtonUploadStyle>
              </Row> */}
              <Row
                gutter={24}
                style={{
                  flexWrap: "nowrap",
                  overflow: "auto",
                  marginTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Image.PreviewGroup>
                  {i?.ListImage?.map((j, idx) => (
                    <FileUpload
                      key={`${j?.uid}_${idx}`}
                      file={j}
                      onDelete={() =>
                        handleChangeReview(
                          {
                            ListImage: i.ListImage?.filter(
                              x => x.uid !== j.uid,
                            ),
                          },
                          i?.id,
                        )
                      }
                    />
                  ))}
                </Image.PreviewGroup>
                {i?.ListVideo?.map((j, idx) => (
                  <FileUpload
                    key={`${j?.uid}_${idx}`}
                    file={j}
                    onDelete={() =>
                      handleChangeReview(
                        {
                          ListVideo: i.ListVideo?.filter(x => x.uid !== j.uid),
                        },
                        i?.id,
                      )
                    }
                  />
                ))}
              </Row>
              {idx !== listPro.length - 1 && <Divider />}
            </RateStyled>
          )
        })}
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalRate
