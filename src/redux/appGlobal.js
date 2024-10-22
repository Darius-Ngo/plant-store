import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listTabs: [],
  isAuthenticated: false,
  userInfo: {},
  listCart: [],
}

export const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState,
  reducers: {
    setListTabs: (state, action) => {
      state.listTabs = action.payload
    },
    setListCart: (state, action) => {
      state.listCart = action.payload
    },
    changeAuthorization: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    resetState: state => {
      return initialState
    },
  },
})

export const {
  changeAuthorization,
  setListTabs,
  setUserInfo,
  setListCart,
  resetState,
} = appGlobalSlice.actions

export default appGlobalSlice.reducer
