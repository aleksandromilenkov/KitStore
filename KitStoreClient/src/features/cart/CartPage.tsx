import { Grid2, Typography } from "@mui/material";
import { useFetchCartQuery } from "./cartApi";
import { useAppSelector } from "../../app/store/store";
import CartItem from "./CartItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

const CartPage = () => {
    const {data, isLoading} = useFetchCartQuery();
    const store = useAppSelector(state=>state);
    console.log(store)
    console.log(data);
    if(isLoading) return <div>Loading...</div>
    console.log(data);
    if(!data || data?.items?.length === 0) return <Typography variant="h3">Your cart is empty.</Typography>
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