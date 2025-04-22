import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import Catalog from "../../features/catalog/Catalog";
import AboutPage from "../../features/about/AboutPage";
import CartPage from "../../features/cart/CartPage";
import ProfilePage from "../../features/account/ProfilePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import OrdersPage from "../../features/orders/OrdersPage";
import OrderDetails from "../../features/orders/OrderDetails";
import RequireAuth from "./RequireAuth";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import InventoryPage from "../../features/admin/InventoryPage";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children: [
            {element: <RequireAuth/>, children:[
                {path: "checkout", element: <CheckoutPage />},
                {path: "checkout/success", element: <CheckoutSuccess/>},
                {path: "orders", element: <OrdersPage/>},
                {path: "orders/:id", element: <OrderDetails/>},
                {path: "inventory", element: <InventoryPage/>},
                {path: "profile", element: <ProfilePage/>}
            ]},
            {path: "", element: <HomePage />},
            {path: "login", element: <LoginForm />},
            {path: "register", element: <RegisterForm />},
            {path: "profile", element: <ProfilePage />},
            {path: "catalog", element: <Catalog />},
            {path: "catalog/:id",element: <ProductDetails />},
            {path: "cart", element: <CartPage />},
            {path: "about", element: <AboutPage />},
            {path: "server-error", element: <ServerError />},
            {path: "not-found", element: <NotFound />},
            {path: "*", element: <Navigate replace to="/not-found" />,},
        ]
    }
])