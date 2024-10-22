import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tagID: null,
}

export const postReducer = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setTagID: (state, action) => {
      state.tagID = action.payload
    },
  },
})

export const { setTagID } = postReducer.actions

export default postReducer.reducer
