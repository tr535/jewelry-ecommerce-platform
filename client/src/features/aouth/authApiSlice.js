import apislice from "../../app/apislice"

const authApiSlice=apislice.injectEndpoints({
    endpoints:(build)=>({
      register:build.mutation({
        query:(registerUser)=>({
            url:"/api/authRout/register",
            method:"POST",
            body:registerUser
        })
      }),
      login: build.mutation({
        query:(loginUser)=>({
            url:"/api/authRout/login",
            method:"POST",
            body:loginUser
        })
      }),
    })
})
export const {useRegisterMutation,useLoginMutation}=authApiSlice