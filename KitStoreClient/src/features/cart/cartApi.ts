import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";
import { DeleteCartItem } from "../../app/models/deleteCartItem";
import { catalogApi } from "../catalog/catalogApi";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query<Cart, void>({
      query: () => ({ url: "cart" }),
      providesTags: ["Cart"],
    }),
    addItemToCart: builder.mutation<Cart, CreateCartItem>({
      query: (cartItemDTO) => {
        return {
          url: `cartItem`,
          body: cartItemDTO,
          method: "POST",
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draftData) => {
            const existingItem = draftData.items.find(
              (i) => i.kitId === args.kitId
            );
            
            if (existingItem) {
              // If item exists, increase quantity
              existingItem.quantity += args.quantity;
            } else {
              // If it's a new item, you might need to add a placeholder
              // This depends on your Cart structure
              // You might not have all the kit details here for optimistic update
              console.log("New item added - full refresh will occur");
            }
          })
        );
        
        try {
          await queryFulfilled;
          // After successful mutation, invalidate to get fresh data
          dispatch(cartApi.util.invalidateTags(["Cart"]));
          dispatch(catalogApi.util.invalidateTags([{ type: 'Products', id: args.kitId }]));
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeItemFromCart: builder.mutation<Cart, DeleteCartItem>({
      query: (cartItem) => ({
        url: `cartItem?itemId=${cartItem.cartItemId}&quantity=${cartItem.quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { cartItemId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(catalogApi.util.invalidateTags([{ type: 'Products', id: cartItemId }]));
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draftData) => {
            const itemIndex = draftData.items.findIndex(
              (i) => i.id === cartItemId
            );
            if (itemIndex >= 0) {
              draftData.items[itemIndex].quantity -= quantity;
              if (draftData.items[itemIndex].quantity <= 0) {
                draftData.items.splice(itemIndex, 1);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      }
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: `cart`,
        method: "DELETE",
      }),
      // Invalidate the cart tag to ensure fresh data
      invalidatesTags: ["Cart"],
      onQueryStarted: async(_, {dispatch, queryFulfilled}) => {
        // Optimistic update
        const patchResult = dispatch(
          cartApi.util.updateQueryData('fetchCart', undefined, (draft) => {
            draft.items = [];
            // Also clear any discount/coupon data if present
            if (draft.coupon) draft.coupon = undefined;
            if (draft.paymentIntentId) draft.paymentIntentId = undefined;
          })
        );
        
        try {
          await queryFulfilled;
          // Explicitly invalidate cart to force refetch
          dispatch(cartApi.util.invalidateTags(["Cart"]));
          // Invalidate products to refresh stock for all items
          dispatch(catalogApi.util.invalidateTags(["Products"]));
        } catch (error) {
          console.log("Failed to clear cart:", error);
          patchResult.undo();
        }
      }
    }),
    addCoupon: builder.mutation<Cart, string>({
      query: (code) => ({
        url: `cart/${code}`,
        method: "POST",
      }),
      onQueryStarted: async ( _, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    removeCoupon: builder.mutation<void, void>({
      query: () => ({
        url: "cart/remove-coupon",
        method: "DELETE",
      }),
      onQueryStarted: async ( _, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
  useAddCouponMutation,
  useRemoveCouponMutation
} = cartApi;
