import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication/AuthSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;