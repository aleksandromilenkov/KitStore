import { LockOutlined } from "@mui/icons-material"
import { Container, Paper, Box, Typography, TextField, Button } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import { useLoginMutation } from "./accountApi";

const LoginForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const [fetchUserInfo] = useLazyUserInfoQuery(); // does not fetch the data automatically like useUserInfoQuery unless you call the method
    const [login, {isLoading}] = useLoginMutation();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        mode: "onTouched", // validation will kick in if we just touch one field
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = async (data: LoginSchema) => {
         try{
            const user =  await login(data).unwrap();
            dispatch(setUser(user));
            navigate(location.state?.from || "/");
         }catch(err){
            console.log(err);
         }
    }
  return (
    <Container component={Paper} maxWidth="sm" sx={{borderRadius:3}}>
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="8">
        <LockOutlined sx={{mt:3, color:"secondary.main", fontSize:40}}/>
        <Typography variant="h5">
            Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3} 
          marginY={3}
          >
            <TextField
                fullWidth
                label="Email"
                autoFocus
                {...register("email")}
                error = {!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                error = {!!errors.password}
                helperText={errors.password?.message}
            />
            <Button disabled={isLoading} variant="contained" type="submit">
                Sign in
            </Button>
            <Typography sx={{textAlign:"center"}}>
                Don't have an account?
                <Typography sx={{ml:"0.5rem"}} component={Link} to={'/register'} color="primary">
                    Sign up
                </Typography>
            </Typography>
        </Box>
    </Box>
</Container>
  )
}
export default LoginForm