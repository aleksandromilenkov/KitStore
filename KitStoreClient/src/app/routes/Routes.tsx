import { createBrowserRouter } from "react-router-dom";
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



export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children: [
            {path: "", element: <HomePage />},
            {path: "login", element: <LoginForm />},
            {path: "register", element: <RegisterForm />},
            {path: "profile", element: <ProfilePage />},
            {path: "catalog", element: <Catalog />},
            {path: "cart", element: <CartPage />},
            {path: "about", element: <AboutPage />},
            {path: "server-error", element: <ServerError />},
            {path: "*", element: <NotFound />},
        ]
    }
])