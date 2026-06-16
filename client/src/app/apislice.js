import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const apisilce=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1500/',
        createtials:"include",
        prepareHeaders:(Headers ,{getState})=>{
            const token=getState().auth.token
            if(token){
                Headers.set("authorization",`Bearer ${token}`)
            }
            return Headers
        },
    }),
        endpoints: () => ({}),

})
export default apisilce