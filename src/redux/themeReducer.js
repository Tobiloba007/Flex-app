import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    changeThemeState: (state, action) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { changeThemeState } = themeSlice.actions;
export default themeSlice.reducer;
