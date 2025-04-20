import { LinearProgress, Grid2, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/store/store";
import { useFetchProductsQuery } from "./catalogApi";
import { setPageNumber } from "./catalogSlice";
import { Leagues } from "../../app/models/leagues";
import { KitTypes } from "../../app/models/kitTypes";
import Filters from "./Filters";
import ProductList from "./ProductList";
import AppPagination from "../../app/shared/components/AppPagination";

const Catalog = () => {
  const productParams = useAppSelector((state) => state.catalogSlice);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const filtersData = {leagues: Object.keys(Leagues).filter(key => isNaN(Number(key))), kitTypes:Object.keys(KitTypes).filter(key => isNaN(Number(key)))};
  const dispatch = useAppDispatch();
  if (isLoading || !data || !productParams) return <LinearProgress/>;
  const onPageChangeHandler = (page:number)=>{
    dispatch(setPageNumber(page));
    window.scrollTo({top:0, behavior:"smooth"})
  }
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData={filtersData} catalogSlice={productParams}/>
      </Grid2>
      <Grid2 size={9}>
        {data?.items && data?.items?.length > 0 ? (<>
        <ProductList products={data.items} />
        <AppPagination metadata={data.pagination} onPageChange={onPageChangeHandler}/>
        </>) : <Typography variant="h5">There are no results for this filter</Typography>}
        
      </Grid2>
    </Grid2>
  );
}
export default Catalog