import { Col, Form, Row, Select } from "antd"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import FlSelect from "src/components/FloatingLabel/Select"
import RegionService from "src/services/RegionService"
import styled from "styled-components"

const { Option } = Select

const Styled = styled.div`
  .ant-select-selection-placeholder {
    z-index: 10;
  }
`
const SelectAddress = forwardRef(
  (
    {
      nameID,
      form,
      initValue,
      onBeforeLoading = () => {},
      onLoadingSuccuss = () => {},
      floating = true,
      required = true,
      isGuest = false,
      readOnly = false,
      listFormName = ["provinceId", "districtId", "wardId"],
    },
    ref,
  ) => {
    const provinceId = listFormName[0] || "provinceId"
    const districtId = listFormName[1] || "districtId"
    const wardId = listFormName[2] || "wardId"
    const [listProvince, setListProvince] = useState()
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setlistWard] = useState()
    const [selected, setSelected] = useState({
      province: {},
      district: {},
      ward: {},
    })
    useImperativeHandle(
      ref,
      () => {
        return {
          address: selected,
        }
      },
      [selected],
    )

    useEffect(() => {
      getListProvinceVN()
      return () => {
        form.resetFields()
      }
    }, [])

    useEffect(() => {
      if (
        initValue?.[provinceId] &&
        listProvince?.length &&
        !selected?.province?.key
      ) {
        const province = listProvince?.find(
          i => i?.id === initValue?.[provinceId],
        )
        setSelected(pre => ({
          ...pre,
          province: {
            key: province?.parentID,
            value: province?.parentID,
            children: province?.name,
          },
        }))
      }
      if (
        initValue?.[districtId] &&
        listDistrict?.length &&
        !selected?.district?.key
      ) {
        const district = listDistrict?.find(
          i => i?.id === initValue?.[districtId],
        )
        setSelected(pre => ({
          ...pre,
          district: {
            key: district?.parentID,
            value: district?.parentID,
            children: district?.name,
          },
        }))
      }

      if (initValue?.[provinceId] && listWard?.length && !selected?.ward?.key) {
        const ward = listWard?.find(i => i?.id === initValue?.[wardId])
        setSelected(pre => ({
          ...pre,
          ward: {
            key: ward?.parentID,
            value: ward?.parentID,
            children: ward?.name,
          },
        }))
      }
    }, [initValue, listProvince, listDistrict, listWard])

    useEffect(() => {
      if (initValue?.[provinceId]) onChangeProvince(initValue?.[provinceId])
      if (initValue?.[districtId]) onChangeDistrict(initValue?.[districtId])
      if (initValue?.[provinceId])
        form?.setFieldsValue({
          [provinceId]: !!initValue?.[provinceId]
            ? initValue?.[provinceId]
            : undefined,
          [districtId]: !!initValue?.[districtId]
            ? initValue?.[districtId]
            : undefined,
          [wardId]: !!initValue?.[wardId] ? initValue?.[wardId] : undefined,
        })
    }, [initValue])

    const getListProvinceVN = () => {
      onBeforeLoading()
      RegionService.getListProvince()
        .then(res => {
          if (res?.isError) return
          setListProvince(res?.Object)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeProvince = (e, province) => {
      form.resetFields([districtId, wardId])
      if (!e) return setListDistrict([])
      setSelected(pre => ({ ...pre, province }))
      onBeforeLoading()
      RegionService.getListDistrict(e)
        .then(res => {
          if (res?.isError) return
          const lstDistrict = res?.Object?.filter(i => i.parentID === e)
          setListDistrict(lstDistrict)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeDistrict = (e, district) => {
      form.resetFields([wardId])
      if (!e) return setlistWard([])
      setSelected(pre => ({ ...pre, district }))

      onBeforeLoading()
      RegionService.getListWard(e)
        .then(res => {
          if (res?.isError) return
          const lstWard = res?.Object?.filter(i => i.parentID === e)
          setlistWard(lstWard)
        })
        .finally(onLoadingSuccuss)
    }

    const onChangeWard = (e, ward) => setSelected(pre => ({ ...pre, ward }))
    return (
      <Styled>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8} id={`${nameID}provinceFixScroll`}>
            <Form.Item
              name={provinceId}
              rules={
                required && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              required={required}
              label={!floating && "Tỉnh/Thành phố "}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}provinceFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                isRequired={required}
                placeholder={!floating && "Tỉnh/Thành phố "}
                onChange={onChangeProvince}
                style={{ width: "100%" }}
                label={!!floating && "Tỉnh/Thành phố "}
                readOnly={readOnly}
              >
                {listProvince?.length &&
                  listProvince?.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id={`${nameID}districtFixScroll`}>
            <Form.Item
              name={districtId}
              rules={
                required && [
                  { required: true, message: "Thông tin không được để trống" },
                ]
              }
              label={!floating && "Quận/Huyện "}
              required={required}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}districtFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                isRequired={required}
                placeholder={!floating && "Quận/Huyện "}
                onChange={onChangeDistrict}
                style={{ width: "100%" }}
                label={!!floating && "Quận/Huyện "}
                readOnly={readOnly}
              >
                {listDistrict?.length &&
                  listDistrict?.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>

          <Col xs={24} md={8} id={`${nameID}wardFixScroll`}>
            <Form.Item
              name={wardId}
              rules={
                required && [
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]
              }
              label={!floating && "Phường/Xã "}
              required={required}
            >
              <FlSelect
                getPopupContainer={() =>
                  document.getElementById(`${nameID}wardFixScroll`)
                }
                maxTagCount="responsive"
                showSearch
                allowClear={!required}
                placeholder={!floating && "Phường/Xã "}
                isRequired={required}
                onChange={onChangeWard}
                style={{ width: "100%" }}
                label={!!floating && "Phường/Xã "}
                readOnly={readOnly}
              >
                {listWard?.length &&
                  listWard?.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </FlSelect>
            </Form.Item>
          </Col>
        </Row>
      </Styled>
    )
  },
)

export default SelectAddress
