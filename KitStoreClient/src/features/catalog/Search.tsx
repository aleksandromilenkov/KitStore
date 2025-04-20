import { debounce, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

const Search = () => {
    const {searchTerm} = useAppSelector(state=> state.catalogSlice);
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(searchTerm);
    useEffect(()=>{
        setTerm(searchTerm)
    },[searchTerm])
    const debouncedSearch = debounce(event => dispatch(setSearchTerm(event.target.value), 500));
  return (
    <TextField
                label="Search kits"
                variant="outlined"
                fullWidth
                type="search"
                value={term}
                onChange={(e)=> {
                    setTerm(e.target.value);
                    debouncedSearch(e);
                }}
            />
  )
}
export default Search