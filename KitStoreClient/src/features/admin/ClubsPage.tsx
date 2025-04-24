import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { useDeleteClubMutation, useFetchClubsQuery } from "./adminApi";
import { Club } from "../../app/models/club";
import ClubForm from "./ClubForm";

const ClubsPage = () => {
    const {data, refetch} = useFetchClubsQuery();
    const [deleteClub] = useDeleteClubMutation();
    const [editMode, setEditMode] = useState(false);
    const [clubToEdit, setClubToEdit] = useState<Club | null>(null);
    const handleDeleteClub = async(productId:number)=>{
        try{
            await deleteClub(productId).unwrap();
            refetch();
        }catch(err){
            console.log(err)
        }
    }
    if(editMode) return(
        <ClubForm
        club={clubToEdit}
        setEditMode={setEditMode}
        refetch={refetch}
        setClub={setClubToEdit}
        />
    )
    return (
        <> 
        <Box display="flex" justifyContent="space-between">
            <Typography sx={{p:2}} variant="h4">Clubs</Typography>
            <Button sx={{m:2}} size="large" variant="contained" onClick={()=>setEditMode(true)}>Create Club</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data?.map(club=> (
                        <TableRow
                            key={club.id}
                            sx={{
                            "&:last-child td, &:last-child th": {border:0}
                            }}
                        >
                            <TableCell component="th" scope="row">{club.id}</TableCell>
                            <TableCell align="left">
                                <Box display="flex" alignItems="center">
                                    <img
                                        src={club.pictureUrl}
                                        alt={club.name}
                                        style={{height:50, marginRight:20}}
                                        />
                                        <span>{club.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{(club.country)}</TableCell>
                            <TableCell align="right">
                                <Button startIcon={<Edit/>} onClick={()=>{
                                    setEditMode(true)
                                    setClubToEdit(club);
                                }
                                }/>
                                <Button onClick={()=>handleDeleteClub(club.id)} startIcon={<Delete/>} color="error"/>
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}
export default ClubsPage