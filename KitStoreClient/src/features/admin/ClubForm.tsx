import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import AppTextInput from "../../app/shared/components/AppTextInput";
import AppSelectInput from "../../app/shared/components/AppSelectInput";
import AppDropzone from "../../app/shared/components/AppDropzone";
import { Kit } from "../../app/models/kit";
import { useEffect } from "react";
import { useCreateClubMutation, useUpdateClubMutation } from "./adminApi";
import { LoadingButton } from "@mui/lab";
import { handleApiError } from "../../lib/util";
import { createClubSchema, CreateClubSchema } from "../../lib/schemas/createClubSchema";
import { Club } from "../../app/models/club";
import { Countries } from "../../app/models/countries";
import { Leagues } from "../../app/models/leagues";
type Props = {
    club: Club | null,
    setEditMode: (value:boolean)=>void,
    setProduct: (value:Kit | null)=>void,
    refetch: ()=>void;
}
const ClubForm = ({club, setEditMode, setProduct, refetch}:Props) => {
    const {control, handleSubmit, watch, reset, setError, formState: {isSubmitting}} = useForm<CreateClubSchema>({
        mode:"onTouched",
        resolver: zodResolver(createClubSchema)
    });
    const watchFile = watch("file");
    const [createClub] = useCreateClubMutation();
    const [updateClub] = useUpdateClubMutation();
    useEffect(()=>{
        if(club) reset(club);
        return ()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview) // remove the object from memory
        }
    }, [club, reset, watchFile])

    const createFormData = (item: FieldValues) =>{
        const formData = new FormData();
        for(const key in item){
            formData.append(key, item[key]);
        }
        return formData;
    }

    const onSubmit = async (data: CreateClubSchema)=>{
        console.log(data);
        try{
            const formData = createFormData(data);
            if(watchFile) formData.append("file", watchFile);
            if(club) await updateClub({id: club.id, club: formData}).unwrap();
            else await createClub(formData).unwrap();
            setEditMode(false);
            setProduct(null);
            refetch();
        }catch(error){
            console.log(error);
            handleApiError<CreateClubSchema>(error, setError, ['league', 'country', 'file', 'name'])
        }
    }
    const countriesArray = Object.keys(Countries).filter(key => isNaN(Number(key))) as Array<keyof typeof Countries>;
    const leaguesArray = Object.keys(Leagues).filter(key => isNaN(Number(key))) as Array<keyof typeof Leagues>;
  return (
    <Box component={Paper} sx={{p:4, maxWidth: 'lg', mx:"auto"}}>
        <Typography variant="h4" sx={{mb:4}}>
            Product Details 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={3}>
                <Grid2 size={12}>
                   <AppTextInput control={control} name="name" label="Club name"/>
                </Grid2>
                <Grid2 size={6}>
                    {countriesArray && <AppSelectInput items={countriesArray} control={control} name="country" label="Country"/>}
                </Grid2>
                <Grid2 size={6}>
                    {leaguesArray && <AppSelectInput items={leaguesArray} control={control} name="league" label="Type"/>}
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="space-between" alignItems="center">
                   <AppDropzone name="file" control={control}/>
                   {watchFile
                    ? (
                    <img src={watchFile.preview} alt="preview of dropped image" style={{maxHeight:200}}/>
                   ) 
                   : club
                     ? <img src={club?.pictureUrl} alt="preview of dropped image" style={{maxHeight:200}}/>
                     : ""
                     }
                </Grid2>
            </Grid2>
            <Box display="flex" justifyContent="space-between" sx={{mt:3}}>
                <Button variant="contained" color="inherit" onClick={()=>{
                    setEditMode(false)
                    setProduct(null);
                }}>Cancel</Button>
                <LoadingButton
                  loading= {isSubmitting}
                  variant="contained" color="success" type="submit">
                    Submit
                  </LoadingButton>
            </Box>
        </form>
    </Box>
  )
}
export default ClubForm