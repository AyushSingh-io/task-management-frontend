import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"
import projectSlice from "./projectSlice.js"
import taskSlice from "./taskSlice.js"

const store = configureStore({
    reducer : {
        auth : authSlice,
        project : projectSlice,
        task : taskSlice
    }
})


export default store;