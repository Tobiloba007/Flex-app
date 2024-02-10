import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        // splashToken: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            // state.loading = false;
        },
        // setSplashToken: (state, action) => {
        //     state.splashToken = action.payload;
        // },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { setUser, setLoading, setError, setIsLoggedIn, setSplashToken } = authSlice.actions;

export default authSlice.reducer;