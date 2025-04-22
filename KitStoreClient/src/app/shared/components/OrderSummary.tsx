import {
    Box,
    Typography,
    Divider,
    Button,
    TextField,
    Paper,
    IconButton,
  } from "@mui/material";
  import { Link, useLocation } from "react-router-dom";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { useAddCouponMutation, useRemoveCouponMutation } from "../../../features/cart/cartApi";
  import { useState } from "react";
  import { DeleteOutline } from "@mui/icons-material";
  import { Coupon } from "../../models/cart";
import { useCart } from "../../../lib/hooks/useCart";
  
  interface CouponFormValues {
    code: string;
  }
  export default function OrderSummary() {
    const location = useLocation();
    const {isLoadingCart, subtotal, deliveryFee, discount, cartCoupon} = useCart();
    const [createCoupon] = useAddCouponMutation();
    const [removeCoupon] = useRemoveCouponMutation();
    const [coupon, setCoupon] = useState<Coupon | null | undefined>(cartCoupon);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CouponFormValues>();
    const onSubmit: SubmitHandler<CouponFormValues> = async (data) => { 
      console.log(data);
             try{
                const resp = await createCoupon(data.code).unwrap();
                if(resp.coupon) setCoupon(resp.coupon);
                else setCoupon(null);
             }catch(err){
                console.log(err);
             }
        }
    const handleRemoveCoupon = () =>{
      removeCoupon();
      reset();
      setCoupon(null);
    }
    if (isLoadingCart) return <Typography>Loading...</Typography>;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="lg"
        mx="auto"
      >
        <Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
          <Typography variant="h6" component="p" fontWeight="bold">
            Order summary
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Orders over $100 qualify for free delivery!
          </Typography>
  
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Subtotal</Typography>
              <Typography>{subtotal}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Discount</Typography>
              <Typography color="success">
                {discount}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Delivery fee</Typography>
              <Typography>{deliveryFee}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">Total</Typography>
              <Typography>{subtotal + deliveryFee - discount}</Typography>
            </Box>
          </Box>
  
          <Box mt={2}>
            {!location.pathname.includes("checkout") && (
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
              >
                Checkout
              </Button>
            )}
            <Button fullWidth component={Link} to="/catalog">
              Continue Shopping
            </Button>
          </Box>
        </Paper>
  
        {/* Coupon Code Section */}
        {location.pathname.includes("checkout") && (<Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="subtitle1" component="label">
              Do you have a voucher code?
            </Typography>
            {coupon && (<Box display="flex" gap="1" alignItems="center">
              <Typography sx={{ fontSize: '0.875rem' }}>{coupon.percentOff}% discount applied</Typography>
              <IconButton onClick={()=> handleRemoveCoupon()} color="error">
             <DeleteOutline sx={{ color: "red" }}/>
            </IconButton>
              </Box>)
              }
            <TextField
              label="Voucher code"
              variant="outlined"
              fullWidth
              disabled={coupon != null}
              sx={{ my: 2 }}
              {...register("code", {
                required: "Coupon code is required",
                minLength: {
                  value: 5,
                  message: "Coupon code must be at least 5 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Coupon code cannot exceed 20 characters",
                },
              })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
  
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={coupon != null}>
              Apply code
            </Button>
          </form>
        </Paper>
      )}
      </Box>
    );
  }
  