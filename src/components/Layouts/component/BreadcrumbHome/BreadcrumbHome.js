import { Breadcrumb } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import LayoutCommon from "src/components/Common/Layout"
import { findParent, treeToList } from "src/lib/utils"
import ROUTER from "src/router"
import styled from "styled-components"
import MenuItemBreadcrumb from "../../MenuItems"
const BreadcrumbHomeStyle = styled.div`
  .ant-breadcrumb-link {
    font-weight: 100 !important;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }

  li:last-child {
    .ant-breadcrumb-link {
      cursor: unset;
    }
  }
`
const BreadcrumbHome = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const treeLabel = tree =>
    tree?.map(i => ({
      ...i,
      title: i?.label,
      children: treeLabel(i?.children),
    }))
  const { listCount } = useSelector(state => state?.appGlobal)

  const locationPathName =location?.pathname

  const items = treeLabel(MenuItemBreadcrumb(navigate, listCount))
  const parents =
    findParent({ children: items }, `${locationPathName}${location?.search}`) ||
    findParent({ children: items }, `${locationPathName}`)
  const listParent = treeToList([parents], "key")
    .reverse()
    ?.filter(i => i?.label)

  return (
    <BreadcrumbHomeStyle>
      {listParent?.length > 0 && (
        <div className="box-breadcrumb-header">
          <div className="breadcrumb-header">
            <LayoutCommon>
              <Breadcrumb separator=">">
                <BreadcrumbItem
                  style={{
                    cursor: "pointer",
                  }}
                  href={ROUTER?.HOME}
                >
                  Trang chủ
                </BreadcrumbItem>
                {listParent?.map((i, idx) => (
                  <BreadcrumbItem
                    style={{
                      cursor:
                        !i?.key?.includes("subkey") &&
                        idx !== listParent?.length - 1
                          ? "pointer"
                          : "unset",
                    }}
                    onClick={() => {
                      if (i?.state) {                                   
                        navigate(
                          i?.key?.includes("subkey") ||
                            idx === listParent?.length - 1
                            ? undefined
                            : i?.key,
                          i?.state,
                        )
                      } else {
                        navigate(
                          i?.key?.includes("subkey") ||
                            idx === listParent?.length - 1
                            ? undefined
                            : i?.key,
                        )
                      }
                    }}
                    key={i?.key}
                  >
                    {i?.label}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </LayoutCommon>
          </div>
        </div>
      )}
    </BreadcrumbHomeStyle>
  )
}

export default BreadcrumbHome
