import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { CreateOrder, Order } from "../../app/models/order";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: ()=> "orders",
            providesTags: ["Orders"],
        }),
        fetchOrderDetails: builder.query<Order, number>({
            query: (id) => `orders/${id}`
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (orderToCreate)=> ({url:"orders", method:"POST", body: orderToCreate}),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    await queryFulfilled;
                    dispatch(orderApi.util.invalidateTags(["Orders"]));
                }catch(err){
                    console.log(err);
                    throw err;
                }
            }
        })
    })
})

export const {useCreateOrderMutation, useFetchOrderDetailsQuery, useFetchOrdersQuery} = orderApi;