import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { CreateOrder, Order } from "../../app/models/order";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: ()=> "order",
            transformResponse: (response: { $values: Order[] }) =>{
               return response.$values || [];
            } ,
            providesTags: ["Orders"],
        }),
        fetchOrderDetails: builder.query<Order, number>({
            query: (id) => `order/${id}`,
            transformResponse: (order: Order) => {
                const fixedOrder = {
                  ...order,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  orderItems: (order as any)?.orderItems?.$values || []
                };
            
                return fixedOrder;
              }
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (orderToCreate)=> ({url:"order", method:"POST", body: orderToCreate}),
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