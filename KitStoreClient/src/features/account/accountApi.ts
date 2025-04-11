import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Address, User } from "../../app/models/User"
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder)=>({
        login: builder.mutation<void, LoginSchema>({
            query: (creds)=>({url:"account/login", method:"POST", body: creds}),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch(err){
                    console.log(err);
                    throw err;
                }
            }
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
            providesTags: ["UserInfo"]
        }),
        logout: builder.mutation<void,void>({
            query: ()=> ({url:"account/logout", method:"POST"}),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                router.navigate('/');
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
        updateEmail: builder.mutation<void,{ newEmail: string }>({
            query: (data)=> ({url:"account/update-email", method:"PUT",body: data }),
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

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery, useLazyUserInfoQuery, useFetchAddressQuery, useUpdateUserAddressMutation, useUpdateEmailMutation, useUpdatePasswordMutation, useUpdateImageMutation} = accountApi;