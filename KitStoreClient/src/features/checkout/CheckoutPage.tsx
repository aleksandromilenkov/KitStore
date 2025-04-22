import { Grid2, Typography } from "@mui/material"
import OrderSummary from "../../app/shared/components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import { useFetchCartQuery } from "../cart/cartApi"
import { useEffect, useMemo, useRef } from "react"
import { useCreateOrUpdateIntentMutation } from "./checkoutApi"
import { useAppSelector } from "../../app/store/store"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const {darkMode} = useAppSelector(state=>state.ui);
  const {data:cart} = useFetchCartQuery();
  const [createPaymentIntent, {isLoading}] = useCreateOrUpdateIntentMutation();
  const created = useRef(false);
  const options:StripeElementsOptions | undefined = useMemo(()=>{
    if(!cart?.clientSecret) return undefined;
    return {
      clientSecret: cart?.clientSecret,
      appearance: {
        labels: "floating",
        theme: darkMode ? "night" : "stripe"
      }
    }
  },[cart?.clientSecret, darkMode])
  useEffect(()=>{
    // workaround for the strict mode in developement mode(in production will work fine) calling twice useEffect() -> we don't want to send 2 paymentIntents
    if(!created.current) createPaymentIntent();
    // the Ref is uneffected when the component is re-render -> it will stay true so the createPaymentIntent() would not be called on the second render
    created.current = true;
  },[createPaymentIntent])
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {(!stripePromise || !options || isLoading) ? (<Typography variant="h6">Loading checkout...</Typography>) : (
        <Elements stripe={stripePromise} options={options}>
        <CheckoutStepper/>
        </Elements>
        )}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary/>
      </Grid2>
    </Grid2>
  )
}
export default CheckoutPage