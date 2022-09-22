import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

// console.log(calendarSlice)
export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        calendar:calendarSlice.reducer,
        auth:authSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})