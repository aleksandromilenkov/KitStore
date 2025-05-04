import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import AppTextInput from "../../app/shared/components/AppTextInput";
import AppSelectInput from "../../app/shared/components/AppSelectInput";
import AppDropzone from "../../app/shared/components/AppDropzone";
import { Kit } from "../../app/models/kit";
import { useEffect } from "react";
import { useCreateProductMutation, useFetchClubsQuery, useUpdateProductMutation } from "./adminApi";
import { handleApiError } from "../../lib/util";
import { CreateProductSchema, createProductSchema } from "../../lib/schemas/createProductSchema";
import { KitTypes } from "../../app/models/kitTypes";
type Props = {
    product: Kit | null,
    setEditMode: (value:boolean)=>void,
    setProduct: (value:Kit | null)=>void,
    refetch: ()=>void;
}
const ProductForm = ({product, setEditMode, setProduct, refetch}:Props) => {
    const {control, handleSubmit, watch, reset, setError, formState} = useForm<CreateProductSchema>({
        mode:"onTouched",
        resolver: zodResolver(createProductSchema)
    });
    const watchFile = watch("file");
    const {data:clubs, isLoading:isLoadingClubs} = useFetchClubsQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    useEffect(()=>{
        if(product) reset(product);
        return ()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview) // remove the object from memory
        }
    }, [product, reset, watchFile])

    const createFormData = (item: FieldValues) =>{
        const formData = new FormData();
        for(const key in item){
            formData.append(key, item[key]);
        }
        return formData;
    }

    const onSubmit = async (data: CreateProductSchema)=>{
        console.log("SUBMITING KIT")
        console.log(data);
        try{
            const formData = createFormData(data);
            if(watchFile) formData.append("file", watchFile);
            if(product) await updateProduct({id: product.id, product: formData}).unwrap();
            else await createProduct(formData).unwrap();
            setEditMode(false);
            setProduct(null);
            refetch();
        }catch(error){
            console.log(error);
            handleApiError<CreateProductSchema>(error, setError, ['clubId', 'seasonYear', 'file','pictureUrl', 'price', 'quantityInStock', 'kitType'])
        }
    }
    const kitTypesArray = Object.entries(KitTypes)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => ({ label: key, value }));
    if(isLoadingClubs) return <LinearProgress/>
    return (
    <Box component={Paper} sx={{p:4, maxWidth: 'lg', mx:"auto"}}>
        <Typography variant="h4" sx={{mb:4}}>
            Create Kit Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={3}>
                <Grid2 size={6}>
                    {clubs && (<AppSelectInput
                                items={clubs.map(c => ({ label: c.name, value: c.id }))}
                                control={control}
                                name="clubId"
                                label="Club"
                                />
                    )}
                </Grid2>
                <Grid2 size={6}>
                    {<AppSelectInput items={kitTypesArray} control={control} name="kitType" label="Kit Type"/>}
                </Grid2>
                <Grid2 size={12}>
                   <AppTextInput type="number" control={control} name="quantityInStock" label="Quantity in stock"/>
                </Grid2>
                <Grid2 size={12}>
                <AppTextInput type="number" control={control} name="price" label="Price"/>
                </Grid2>
                <Grid2 size={12}>
                   <AppTextInput type="number" control={control} name="seasonYear" label="Season Year"/>
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="space-between" alignItems="center">
                   <AppDropzone name="file" control={control}/>
                   {watchFile
                    ? (
                    <img src={watchFile.preview} alt="preview of dropped image" style={{maxHeight:200}}/>
                   ) 
                   : product
                     ? <img src={product?.pictureUrl} alt="preview of dropped image" style={{maxHeight:200}}/>
                     : ""
                     }
                </Grid2>
            </Grid2>
            <Box display="flex" justifyContent="space-between" sx={{mt:3}}>
                <Button variant="contained" color="inherit" onClick={()=>{
                    setEditMode(false)
                    setProduct(null);
                }}>Cancel</Button>
                <Button onClick={()=>{console.log("SUBMIT KIT")}} variant="contained" color="success" type="submit" disabled={formState.isSubmitting}>
                    Submit
                </Button>
            </Box>
        </form>
    </Box>
  )
}
export default ProductForm