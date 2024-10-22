import styled from "styled-components"

export const MainTableHeader = styled.div`
  font-size: 13px !important;
`

export const SubTableHeader = styled.div`
  font-style: italic;
  font-size: 13px !important;
  font-weight: 400;
`
export const MainTableData = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const SubTableData = styled.span`
  font-style: italic;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const CellListContent = styled.div`
  padding: 4px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0 -4px;
  &:hover {
    border-bottom: 1px solid #ddd;
  }
  &:last-child {
    border-bottom: unset;
  }
`

export const TableCustomStyled = styled.div`
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${props =>
      props.isPrimary ? "var(--color-primary)" : "#F0F0F0"};
  }
  .ant-table-column-sorter-inner {
    svg path {
      fill: rgba(243, 246, 249, 0.5);
    }
    .active {
      svg path {
        fill: #fff;
      }
    }
  }
  .ant-table-wrapper,
  .ant-table,
  .ant-table-container {
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      background-color: transparent !important;
    }
  }
  .ant-table-sticky-scroll {
    display: none;
  }
  .ant-spin-nested-loading {
    /* height: 100%; */
  }
  .ant-table-thead {
    .ant-table-cell {
      background: ${props =>
        props.isPrimary ? "var(--color-primary)" : "#FFF"};
      color: ${props => (props.isPrimary ? "#fff" : "#212529")};
      font-size: 14px;
      border-bottom: 2px solid #ddd;
    }
  }
  .ant-table-tbody > tr.ant-table-row-selected > td,
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: ${props =>
      props.isPrimary
        ? "rgb(227, 243, 254)"
        : "rgb(251 249 239 / 50%)"} !important;
  }

  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th {
    /* border-right: ${props =>
      props.isPrimary ? "1px solid #f0f0f0" : "1px solid #f0f0f0"}; */
    border-right: unset;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 4px;
  }
  .ant-table-container table > thead > tr:first-child th:nth-last-child(2) {
    /* border-top-right-radius: 4px; */
    /* border-right: 0px solid #f0f0f0 !important; */
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 4px;
  }
  .ant-table-thead > tr > th {
    text-align: center;
    padding: 4px 8px;
  }

  .ant-table-cell-fix-right-first::after {
    border-inline-end: unset !important;
  }

  .ant-table-body {
    overflow: auto auto !important;
    transition: all linear 0.2s;
    /* height: 100%; */
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c5ced9;
      border-radius: 12px;
    }
  }
  .ant-table-body {
    /* overflow: hidden !important; */
    &::-webkit-scrollbar {
      /* width: 10px; */
      background-color: #fff !important;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
      background-color: #fff !important;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      /* background: #888; */
      background-color: #fff !important;
    }
  }

  .ant-table-body:hover {
    /* overflow: auto !important; */
    &::-webkit-scrollbar {
      /* width: 10px; */
      background-color: #fff !important;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1 !important;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #ddd !important;
    }
  }

  .ant-table-cell-scrollbar:not([rowspan]) {
    box-shadow: none;
  }
  td.ant-table-cell {
    padding: 8px !important;
    border-right: unset !important;
  }
  .ant-table-placeholder {
    .ant-table-cell {
      border-bottom: none !important;
    }
  }
  .ant-table-row {
    cursor: pointer;
  }
  .ant-table-row-level-0:hover {
    .float-action__wrapper {
      display: inline-flex;
    }
  }
  .ant-table-tbody > tr:hover {
    .float-action__wrapper {
      min-width: 80px;
      display: inline-flex;
    }
  }
  .ant-table-expanded-row-fixed {
    margin: 0px !important;
    padding: 0px !important;
    width: auto !important;
    ::after {
      border-right: 0px !important;
    }
  }
  /* .ant-table-pagination {
    display: ${props => (props.showPagination ? "flex" : "none")};
  } */
  .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner,
  .ant-checkbox .ant-checkbox-inner {
    border: 1px solid
      ${props =>
        props.isPrimary ? "var(--color-primary)" : "var(--color-brown-dark)"};
  }
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner,
  .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner,
  .ant-checkbox-checked:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    background-color: ${props =>
      props.isPrimary ? "var(--color-primary)" : "var(--color-brown-dark)"};
    border-color: ${props =>
      props.isPrimary ? "var(--color-primary)" : "var(--color-brown-dark)"};
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner:after {
    background-color: ${props =>
      props.isPrimary ? "var(--color-primary)" : "var(--color-brown-dark)"};
  }
  .ant-checkbox-checked:after {
    border-color: ${props =>
      props.isPrimary
        ? "var(--color-primary)"
        : "var(--color-brown-dark)"} !important;
  }
`
