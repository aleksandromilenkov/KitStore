import { Grid2 } from "@mui/material"
import { Kit } from "../../app/models/kit"
import ProductCard from "./ProductCard"
import { Cart } from "../../app/models/cart"

type Props = {
    products: Kit[],
    cart: Cart
}
const ProductList = ({products, cart}: Props) => {
  return (
        <Grid2 container spacing={3}>
        {products?.map(item => (
          <Grid2 size={3} display="flex" key={item.id}>
           <ProductCard key={item.id} product={item} cart={cart}/>
          </Grid2>
          ))}
      </Grid2>
  )
}
export default ProductList