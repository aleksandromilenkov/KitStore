import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Kit } from "../../app/models/kit";
import { Club } from "../../app/models/club";

export const adminApi = createApi({
    reducerPath: "adminApi",
    tagTypes: ["Clubs"],
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
        }),
        fetchClubs: builder.query<Club[], void>({
            query: ()=>({url:"club"}),
            providesTags: ["Clubs"]
        }),
        createClub: builder.mutation<Club, FormData>({
            query:(data: FormData) => {
                return {
                    url:"club",
                    method:"POST",
                    body:data,
                }
            }
        }),
        updateClub: builder.mutation<Club, {id: number, club: FormData}>({
            query:({id, club}) => {
                club.append('id', id.toString());
                return {
                    url: "kit",
                    method: "PUT",
                    body: club,
                }
            }
        }),
        deleteClub: builder.mutation<void, number>({
            query:(clubId)=>{
                return {
                    url: `club/${clubId}`,
                    method: "DELETE",
                }
            }
        }),
    })
})

export const {useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useFetchClubsQuery, useCreateClubMutation, useUpdateClubMutation, useDeleteClubMutation} = adminApi;