import {configureStore} from "@reduxjs/toolkit"
import apiSilce from "./apislice"
import authSliceReducer from "../features/aouth/authSlice"
const store=configureStore({
    reducer:{
        [apiSilce.reducerPath]:apiSilce.reducer,
        auth:authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSilce.middleware),
        devTools:true
})
export default store