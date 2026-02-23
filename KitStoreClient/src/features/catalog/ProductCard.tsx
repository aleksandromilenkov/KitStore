import {
    Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Kit } from "../../app/models/kit";
import { Link, useNavigate } from "react-router-dom";
import { useAddItemToCartMutation, useFetchCartQuery } from "../cart/cartApi";
import { toast } from "react-toastify";
import { CreateCartItem } from "../../app/models/createCartItem";
import { useEffect } from "react";
import { useAppSelector } from "../../app/store/store";

type Props = {
  product: Kit;
}; 
const ProductCard = ({ product }: Props) => {
  console.log(product)
   const [addToCart, {isLoading: isLoading} ] = useAddItemToCartMutation();
   const {data:cart, refetch, isLoading:isLoadingCart} = useFetchCartQuery();
   const navigate = useNavigate()
   const user = useAppSelector(state => state.user?.user);
   useEffect(() => {
    if (!cart) {
      refetch();
    }
  }, [cart, refetch]);
   const addToCartHandler = async ()=>{
      if(!user || !cart){
        navigate("/login", {state: {from: `/catalog/${product.id}`}}) // pass the current path in state so we can navigate back to it after login
        return;
      }
       const cartItemToCreate: CreateCartItem = {
         kitId: product.id,
         cartId: cart.id,
         quantity: 1
       };
      const result = await addToCart(cartItemToCreate);
      if(result.data) {
       toast.success("Product added to cart.")
      }
    }
    if(isLoadingCart) return <LinearProgress/>
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ textTransform: "uppercase" }}
        >
          {product.club?.name} {product.kitType?.toString()} {product.seasonYear-1}/{product.seasonYear}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          ${product.price}
        </Typography>
      </CardContent>
      <Box sx={{ justifyContent: "space-between" }}>
        <Button onClick={addToCartHandler} disabled={isLoading}>Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
      </Box>
    </Card>
  );
};
export default ProductCard;
