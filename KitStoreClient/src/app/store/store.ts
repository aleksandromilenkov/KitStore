import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../features/account/userSlice";
import { accountApi } from "../../features/account/accountApi";

import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage by default
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { catalogApi } from "../../features/catalog/catalogApi";
import { cartApi } from "../../features/cart/cartApi";
import { orderApi } from "../../features/orders/orderApi";
import { adminApi } from "../../features/admin/adminApi";
import { checkoutApi } from "../../features/checkout/checkoutApi";

// Persist config only for user slice
const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    ui: uiSlice.reducer,
    catalogSlice: catalogSlice.reducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(catalogApi.middleware, accountApi.middleware, cartApi.middleware, orderApi.middleware, adminApi.middleware, checkoutApi.middleware),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
