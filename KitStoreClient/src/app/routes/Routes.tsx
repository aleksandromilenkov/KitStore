import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children: [
            {path: "", element: <HomePage />},
            {path: "login", element: <LoginForm />},
            {path: "register", element: <RegisterForm />},
        ]
    }
])