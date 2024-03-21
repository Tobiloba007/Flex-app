// import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication/AuthSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;