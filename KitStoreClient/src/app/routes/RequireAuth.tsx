import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi"
import { LinearProgress } from "@mui/material";

const RequireAuth = () => {
    const {data:user, isLoading} = useUserInfoQuery();
    const location = useLocation();
    if(isLoading) return <LinearProgress/>
    if(!user) return <Navigate to={"/login"} state={{from: location}}/>
    const adminRoutes = ["/inventory", "/admin-dashboard"];
    const roleValues = Array.isArray(user.roles.values)
    ? user.roles.values
    : user.roles?.$values ?? [];
    if(adminRoutes.includes(location.pathname) && !roleValues.includes("Admin")) {
      return <Navigate to={"/"} replace/>
    }
  return (
    <Outlet/>
  )
}
export default RequireAuth