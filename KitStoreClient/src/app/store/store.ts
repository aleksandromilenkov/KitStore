import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../features/account/userSlice";
import { accountApi } from "../../features/account/accountApi";

export const store = configureStore({
    reducer:{
        [accountApi.reducerPath]: accountApi.reducer,
        ui: uiSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
       .concat(
        accountApi.middleware
       )// Add api middleware for caching and automaticaly refetching
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();