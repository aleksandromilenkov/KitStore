import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { cartApi } from "../cart/cartApi";


export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        createOrUpdateIntent: builder.mutation<Cart, void>({
            query: ()=> ({url:"payments", method:"POST"}),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                try{
                    const {data} = await queryFulfilled;
                    dispatch(
                        cartApi.util.updateQueryData("fetchCart", undefined, (draftData)=>{
                            draftData.clientSecret = data.clientSecret
                        })
                    )
                }catch(err){
                    console.log("Payment intent creation failed", err);
                }
            }
        })
        })
    });

export const {useCreateOrUpdateIntentMutation} = checkoutApi;