import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductsDetailsQuery } from "./catalogApi";
import { ChangeEvent, useEffect, useState } from "react";
import { useAddItemToCartMutation, useFetchCartQuery, useRemoveItemFromCartMutation } from "../cart/cartApi";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const {data:cart} = useFetchCartQuery();
  const { data: product, isLoading } = useFetchProductsDetailsQuery(+id!);
  const [addToCart, { isLoading: addingItemToCart }] = useAddItemToCartMutation();
  const [removeFromCart, { isLoading: removingItemToCart }] = useRemoveItemFromCartMutation();
  const { data: cartItems } = useFetchCartQuery();
  const item = product && cartItems?.items?.find((i) => i.kitId === product.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  if (!product || isLoading || addingItemToCart || removingItemToCart || !cart) return <div>Loading...</div>;
  
  const handleUpdateBasket = async ()=>{
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if(!item || quantity > item.quantity){
      const result = await addToCart({kitId:product.id, quantity: updatedQuantity, cartId:cart?.id});
      if (result.data) {
        toast.success("Product added to cart.");
      }
    } else {
      removeFromCart({cartItemId: product.id, quantity: updatedQuantity});
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)=> {
    const value = +event.target.value;
    if(value>=0) setQuantity(value);
  }

  const productDetails = [
    { label: "Name", value: product.name },
    // { label: "Description", value: product.de },
    { label: "Kit Type", value: product.kitType },
    { label: "Season Year", value: product.seasonYear },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <div>
      <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
        <Grid2 size={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table
              sx={{
                "& td": { fontSize: "1rem" },
              }}
            >
              <TableBody>
                {productDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {detail.label}
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid2 container spacing={2} marginTop={3}>
            <Grid2 size={6}>
              <TextField
                variant="outlined"
                type="number"
                label="Quantity in cart"
                fullWidth
                value={quantity}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button
                sx={{ height: "55px" }}
                disabled={quantity === item?.quantity || !item && quantity === 0}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                onClick={handleUpdateBasket}
              >
                {item ? "Update Cart" : "Add to cart"}
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};
export default ProductDetails;
