import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { Order } from "../../app/models/order";
import { formatAddressString, formatPaymentString } from "../../lib/util";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/store/store";
import { cartApi, useFetchCartQuery } from "../cart/cartApi";

const CheckoutSuccess = () => {
  const dispatch = useAppDispatch();
  const {state} = useLocation();
  const order = state.data as Order;
   // Force refetch cart on mount to ensure it's empty
  useEffect(() => {
    dispatch(cartApi.util.invalidateTags(["Cart"]));
  }, [dispatch]);
  
  // Also trigger a fetch to update the UI
  const { refetch } = useFetchCartQuery();
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  if(!order) return <Typography>Problem accessing the order</Typography>
  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thanks for your order!
        </Typography>
        <Typography variant="body1" gutterBottom color="secondary">
          Your order <strong>#{order.id}</strong> will be processed
        </Typography>
        <Paper elevation={1} sx={{p:2, mb:2, display:"flex", flexDirection:"column", gap:1.5 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Order date
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {order.orderDate}
            </Typography>
          </Box>
          <Divider/>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Payment method
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatPaymentString(order.paymentSummary)}
            </Typography>
          </Box>
          <Divider/>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Shipping address
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatAddressString(order.shippingAddress)}
            </Typography>
          </Box>
          <Divider/>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Amount
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              ${(order.total)}
            </Typography>
          </Box>
        </Paper>
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button variant="contained" color="primary" component={Link} to={`/orders/${order.id}`}>
            View your order
          </Button>
          <Button component={Link} to="/catalog" variant="outlined" color="primary">
            Continue shopping
          </Button>
        </Box>
      </>
    </Container>
  )
}
export default CheckoutSuccess