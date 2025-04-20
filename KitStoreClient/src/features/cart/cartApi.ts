import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart, RawCart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";
import { DeleteCartItem } from "../../app/models/deleteCartItem";
import { CartItem } from "../../app/models/cartItem";

// const isCartItem = (product: Kit | CartItem): product is CartItem => {
//   return (product as CartItem).quantity !== undefined;
// };

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query<Cart, void>({
      query: () => ({ url: "cart" }),
      transformResponse: (response: RawCart): Cart => {
        const rawItems = response.items as CartItem[] | { $values: CartItem[] };
        const items = Array.isArray(rawItems)
          ? rawItems
          : rawItems?.$values ?? [];
    
        return {
          ...response,
          items, // now definitely CartItem[]
        };
      },
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
      onQueryStarted: async (_,{ dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
           dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch (error) {
          console.log(error);
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
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draftData) => {
            const itemIndex = draftData.items.findIndex(
              (i) => i.kitId === cartItemId
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
      onQueryStarted: async(_, {dispatch}) => {
        dispatch(cartApi.util.updateQueryData('fetchCart', undefined, (draft) => {
          draft.items = [];
          draft.id = NaN;
        }));
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
