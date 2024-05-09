import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    changeMessageState: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { changeMessageState } = messageSlice.actions;
export default messageSlice.reducer;
