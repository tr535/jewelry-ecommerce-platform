import apisilce from "../../../app/apislice";

const bascetapiSlice=apisilce.injectEndpoints({
    endpoints:(build)=>({
        getallbascet:build.query({
            query:()=>({
                url:"/api/bascet/"
            }),
            providesTags:["bascet"]
        }),
        
        addtobascet:build.mutation({
            query:(prudact)=>({
                url:"/api/bascet/addToBascet",
                method:"POST",
                body:prudact
            }),
            invalidatesTags:["bascet"]
        }),
        updatequetity:build.mutation({
            query:(product)=>({
                url:"/api/bascet/updateQuentity",
                method:"PUT",
                body:product
            }),
            invalidatesTags:["bascet"]
        }),
        deletefrombascet:build.mutation({
            query:(id)=>({
                url:`/api/bascet/${id}`,
                method:"DELETE"
            }),
              invalidatesTags: ['products', 'bascet'], 
        })

    })
})
export const {useGetallbascetQuery,useAddtobascetMutation,useDeletefrombascetMutation,useUpdatequetityMutation}=bascetapiSlice