import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import AppTextInput from "../../app/shared/components/AppTextInput";
import AppSelectInput from "../../app/shared/components/AppSelectInput";
import AppDropzone from "../../app/shared/components/AppDropzone";
import { useEffect } from "react";
import { useCreateClubMutation, useUpdateClubMutation } from "./adminApi";
import { handleApiError } from "../../lib/util";
import { createClubSchema, CreateClubSchema } from "../../lib/schemas/createClubSchema";
import { Club } from "../../app/models/club";
import { Countries } from "../../app/models/countries";
import { Leagues } from "../../app/models/leagues";
type Props = {
    club: Club | null,
    setEditMode: (value:boolean)=>void,
    setClub: (value:Club | null)=>void,
    refetch: ()=>void;
}
const ClubForm = ({club, setEditMode, setClub, refetch}:Props) => {
    const {control, handleSubmit, watch, reset, setError, formState} = useForm<CreateClubSchema>({
        mode:"onTouched",
        resolver: zodResolver(createClubSchema)
    });
    console.log("Form Errors:", formState.errors)
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
        console.log("SUBMITTING CLUB")
        console.log(data);
        try{
            const formData = createFormData(data);
            if(watchFile) formData.append("file", watchFile);
            if(club) await updateClub({id: club.id, club: formData}).unwrap();
            else await createClub(formData).unwrap();
            setEditMode(false);
            setClub(null);
            refetch();
        }catch(error){
            console.log(error);
            handleApiError<CreateClubSchema>(error, setError, ['league', 'country', 'file', 'name'])
        }
    }
    const countriesArray = Object.entries(Countries)
    .filter(([key]) => isNaN(Number(key))) // Get name-value pairs, exclude reverse mapping
    .map(([key, value]) => ({ label: key, value }));
  
    const leaguesArray = Object.entries(Leagues)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  
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
                    {leaguesArray && <AppSelectInput items={leaguesArray} control={control} name="league" label="League name"/>}
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
                    setClub(null);
                }}>Cancel</Button>
                <Button onClick={()=>{console.log("SUBMITTT")}} variant="contained" color="success" type="submit" disabled={formState.isSubmitted}>
                    Submit
                </Button>
            </Box>
        </form>
    </Box>
  )
}
export default ClubForm