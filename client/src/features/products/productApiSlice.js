import apiSlice from "../../app/apislice"


    const productApiSlice = apiSlice.injectEndpoints({
        endpoints: (build) => ({
        getallproduct: build.query({
        query:()=>({
            url: '/api/home/getall'
        }),
        providesTags:["products"]
    }),
        deleteproduct: build.mutation({
            query:(id)=>({
                url:`/api/home/${id}`,
                method:"DELETE",
                bode:id
            }),
            invalidatesTags:["products"]
         }),
         addproduct: build.mutation({
            query:(product)=>({
                url:`/api/home/createproduct`,
                method:"POST",
                body:product,  
                //ממיר את זה לjson
                    headers: {  'Content-Type': 'application/json',
    },
            }),
            invalidatesTags:["products"]
        }),
        updateproduct: build.mutation({
            query:(product)=>({
                url:`/api/home/updateproduct`,
                method:"PUT",
                body:product,  
                    headers: {  'Content-Type': 'application/json', },
            }),
            invalidatesTags:["products"]
        }),

}),

})

export const {useGetallproductQuery,useDeleteproductMutation,useAddproductMutation,useUpdateproductMutation}=productApiSlice
