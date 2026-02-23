import { Box, Button, Grid2, LinearProgress, Typography } from "@mui/material";
import { useFetchCartQuery } from "./cartApi";
import { useAppSelector } from "../../app/store/store";
import CartItem from "./CartItem";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const {data, isLoading} = useFetchCartQuery();
    const store = useAppSelector(state=>state);
    const navigate = useNavigate();
    console.log(store)
    console.log(data);
    if(isLoading) return <LinearProgress/>;
    if(!data) {
        return(
            <Box sx={{ justifyContent: "space-between", display:"flex", alignSelf:"center", flexDirection:"column", alignItems:"center" }}>
                <Typography variant="h6" component="p" fontWeight="bold">You must first login in order to shop.</Typography>
                <Button onClick={()=> navigate('/login')}>Login here</Button>
            </Box>
        )
    }
    console.log(data);
    if(data?.items?.length === 0) return <Typography variant="h3">Your cart is empty.</Typography>
  return (
    <Grid2 container spacing={2}>
        <Grid2 size={8}>
            {data.items.map((item)=>
            (<CartItem key={item.kitId} item={item}/>))}
        </Grid2>
        <Grid2 size={4}>
            <OrderSummary/>
        </Grid2>
    </Grid2>
  )
}
export default CartPage