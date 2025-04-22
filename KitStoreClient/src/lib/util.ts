import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { PaymentSummary, ShippingAddress } from "../app/models/order";

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value])=> value !== "" && value !== null
      && value !== undefined && value.length !== 0
    )
  )
}

export const formatAddressString = (address : ShippingAddress): string =>{
  return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state},
          ${address?.postal_code}, ${address?.country}`;
}

export const formatPaymentString = (card: PaymentSummary) =>{
  return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4},
          Exp: ${card?.exp_month}/${card?.exp_year}`;
}

export function handleApiError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>, fieldNames: Path<T>[]) {
    const apiError = (error as {message: string}) || {};
    if(apiError.message && typeof apiError.message === 'string'){
      const errorArray = apiError.message.split(",")
      errorArray.forEach(e => {
        const matchField = fieldNames.find(fieldName => e.toLowerCase().includes(fieldName.toString().toLowerCase()));
        if(matchField) setError(matchField, {message: e.trim()});
      })
    }
  }