import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store"
import { useFetchProductsQuery } from "../catalog/catalogApi";
import { Delete, Edit } from "@mui/icons-material";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Kit } from "../../app/models/kit";
import { useDeleteProductMutation } from "./adminApi";

const InventoryPage = () => {
    const params = useAppSelector(state => state.catalogSlice);
    const {data, refetch} = useFetchProductsQuery(params);
    const [deleteProduct] = useDeleteProductMutation();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Kit | null>(null);
    const handleDeleteProduct = async(productId:number)=>{
        try{
            await deleteProduct(productId).unwrap();
            refetch();
        }catch(err){
            console.log(err)
        }
    }
    if(editMode) return(
        <ProductForm
        product={productToEdit}
        setEditMode={setEditMode}
        refetch={refetch}
        setProduct={setProductToEdit}
        />
    )
    return (
        <> 
        <Box display="flex" justifyContent="space-between">
            <Typography sx={{p:2}} variant="h4">Inventory</Typography>
            <Button sx={{m:2}} size="large" variant="contained" onClick={()=>setEditMode(true)}>Create Kit</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Kit</TableCell>
                        <TableCell align="right">Club</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Season</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.items?.map(product=> (
                        <TableRow
                            key={product.id}
                            sx={{
                            "&:last-child td, &:last-child th": {border:0}
                            }}
                        >
                            <TableCell component="th" scope="row">{product.id}</TableCell>
                            <TableCell align="left">
                                <Box display="flex" alignItems="center">
                                    <img
                                        src={product.pictureUrl}
                                        alt={product.name}
                                        style={{height:50, marginRight:20}}
                                        />
                                        <span>{product.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{(product.club.name)}</TableCell>
                            <TableCell align="right">${(product.price.toFixed(2))}</TableCell>
                            <TableCell align="center">{product.kitType}</TableCell>
                            <TableCell align="center">{`${product.seasonYear -1}/${product.seasonYear}`}</TableCell>
                            <TableCell align="center">{product.quantityInStock}</TableCell>
                            <TableCell align="right">
                                <Button startIcon={<Edit/>} onClick={()=>{
                                    setEditMode(true)
                                    setProductToEdit(product);
                                }
                                }/>
                                <Button onClick={()=>handleDeleteProduct(product.id)} startIcon={<Delete/>} color="error"/>
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Box sx={{p:3}}>
                {data?.pagination && data.items.length > 0 && (
                    <AppPagination
                        metadata={data.pagination}
                        onPageChange={(page:number)=> dispatch(setPageNumber(page))}
                    />
                )}
            </Box>
        </TableContainer>
    </>
  )
}
export default InventoryPage