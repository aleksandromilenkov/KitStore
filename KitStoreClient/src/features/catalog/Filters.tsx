import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/store/store";
import { resetParams, setKitTypes, setOrderBy, setLeagues } from "./catalogSlice";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import { ProductParams } from "../../app/models/productParams";
import { KitTypes } from "../../app/models/kitTypes";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const kitOptions = [
    {value: KitTypes.Home.toString(), label:"Home"},
    {value: KitTypes.Away.toString(), label:"Away"},
    {value: KitTypes.Third.toString(), label:"Thrid Kit"},
]

type Props = {
    filtersData: {leagues: string[], kitTypes: string[]; },
    catalogSlice: ProductParams
}

const Filters = ({filtersData:data, catalogSlice}:Props) => {
    const dispatch = useAppDispatch();

    const orderByHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(setOrderBy(e.target.value));
    }
    const kitTypesHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setKitTypes(e.target.value));
    }
    const leaguesHandler = (updatedLeagues: string[]) => {
        dispatch(setLeagues(updatedLeagues));
    }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
            <Search/>
        </Paper>
        <Paper sx={{padding:3}}>
            <RadioButtonGroup selectedValue={catalogSlice.orderBy} onChange={orderByHandler} options={sortOptions}/>
        </Paper>
        <Paper sx={{padding:3}}>
            <CheckboxButtons checkboxes={data.leagues} checked={catalogSlice.leagues} onChange={leaguesHandler}/>
        </Paper>
        <Paper sx={{padding:3}}>
        <RadioButtonGroup 
            selectedValue={catalogSlice.kitType?.toString() ?? ""} 
            onChange={kitTypesHandler} 
            options={kitOptions}
        />
        </Paper>
        <Button onClick={()=> dispatch(resetParams())}>Reset filters</Button>
    </Box>
  )
}
export default Filters