import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../../app/models/productParams";
import { KitTypes } from "../../app/models/kitTypes";
const initialState: ProductParams = {
    pageNumber: 1,
    pageSize: 8,
    searchTerm: "",
    orderBy: "name",
    leagues: [],
    kitType: KitTypes.Home.toString(),
}
export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState: initialState,
    reducers:{
        setPageNumber: (state, action)=> {
            state.pageNumber = action.payload
        },
        setPageSize: (state, action)=> {
            state.pageNumber = action.payload
        },
        setSearchTerm: (state, action)=> {
            state.searchTerm = action.payload;
            state.pageNumber = 1;
        },
        setOrderBy: (state, action)=>{
           state.orderBy = action.payload;
           state.pageNumber = 1;
        },
        setLeagues: (state, action)=>{
            state.leagues = action.payload;
            state.pageNumber = 1;
        },
        setKitTypes: (state, action)=>{
            state.kitType = action.payload
            state.pageNumber = 1;
        },
        resetParams(){
            return initialState;
        }
    }
})

export const {setPageNumber, setPageSize, setSearchTerm, setOrderBy, setLeagues, setKitTypes, resetParams} = catalogSlice.actions;