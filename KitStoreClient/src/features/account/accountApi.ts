import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Address, User } from "../../app/models/user"
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";
import { RootState } from "../../app/store/store";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder)=>({
        login: builder.mutation<User, LoginSchema>({
            query: (creds)=>({url:"account/login", method:"POST", body: creds}),
        }),
        register: builder.mutation<void, object>({
            query: (creds)=> ({url:"account/register", method:"POST", body:creds}),
            onQueryStarted: async(_, {queryFulfilled}) => {
                try{
                    await queryFulfilled;
                    toast.success("Registration succesful - you can now sign in!")
                    router.navigate("/login");
                }catch(err){
                    console.log(err)
                    throw err;
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: ()=> ({url:"account/user-info"}),
            providesTags: ["UserInfo"],
            async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
                try {
                  const { data } = await queryFulfilled;
                  const existingUser = (getState() as RootState).user.user;
                  dispatch(setUser({
                    ...data,
                    token: existingUser?.token || "", // keep the old one instead of creatin new one on every req
                  }));
                } catch (err) {
                  console.log("Failed to fetch user info:", err);
                }
              }
        }),
        fetchAddress: builder.query<Address, void>({
            query:()=>({url:"account/address"})
        }),
        updateUserAddress: builder.mutation<Address, Address>({
            query:(address)=>({url:"account/address", method:"POST", body: address}),
            onQueryStarted: async(address, {dispatch, queryFulfilled})=>{
                const patchResult = dispatch(accountApi.util.updateQueryData("fetchAddress", undefined, (draftData)=>{
                    Object.assign(draftData, {...address})
                }))
                try{
                    await queryFulfilled;
                }catch(err){
                    console.log(err);
                    patchResult.undo();
                }
            }
        }),
        updateUsername: builder.mutation<void,{ newUsername: string }>({
            query: (data)=> ({url:"account/update-username", method:"PUT",body: data }),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch(err){
                    console.log(err);
                }
            }
        }),
        updatePassword: builder.mutation<void,{ currentPassword: string; newPassword: string }>({
            query: (data)=> ({url:"account/update-password", method:"PUT",body: data }),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch(err){
                    console.log(err);
                }
            }
        }),
        updateImage: builder.mutation<void, FormData>({
            query: (data)=> ({url:"account/update-image", method:"PUT",body: data }),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch(err){
                    console.log(err);
                }
            }
        }),
    })
});

export const {useLoginMutation, useRegisterMutation, useUserInfoQuery, useLazyUserInfoQuery, useFetchAddressQuery, useUpdateUserAddressMutation, useUpdateUsernameMutation, useUpdatePasswordMutation, useUpdateImageMutation} = accountApi;