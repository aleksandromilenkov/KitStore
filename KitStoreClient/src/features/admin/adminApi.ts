import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Kit } from "../../app/models/kit";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createProduct: builder.mutation<Kit, FormData>({
            query:(data: FormData) => {
                return {
                    url:"kit",
                    method:"POST",
                    body:data,
                }
            }
        }),
        updateProduct: builder.mutation<void, {id:number, product:FormData}>({
            query:({id, product}) => {
                product.append('id', id.toString());
                return {
                    url: "kit",
                    method: "PUT",
                    body: product,
                }
            }
        }),
        deleteProduct: builder.mutation<void, number>({
            query:(kitId)=>{
                return {
                    url: `kit/${kitId}`,
                    method: "DELETE",
                }
            }
        })
    })
})

export const {useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation} = adminApi;