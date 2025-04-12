import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useUpdateImageMutation, useUserInfoQuery } from "./accountApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AppDropzone from "../../app/shared/components/AppDropzone";
import { User } from "../../app/models/user";
const fileSchema = z.instanceof(File).refine(file => file.size > 0, { message: "File must be uploaded"})
.transform(file=>({
    ...file,
    preview: URL.createObjectURL(file)
}))
const updateImageSchema = z.object({
    imageFile: fileSchema
})
type UpdateImageFormValues = z.infer<typeof updateImageSchema>;
const UpdateImageForm = () => {
    const {control,reset, handleSubmit, watch} = useForm<UpdateImageFormValues>({
        mode:"onTouched",
        resolver: zodResolver(updateImageSchema)
    });
    const {data:fetchedUser} = useUserInfoQuery();
    const [user, setUser] = useState<User | null | undefined>(fetchedUser);
    const [updateImage, {isLoading}] = useUpdateImageMutation();
    const watchFile = watch("imageFile");
    const onSubmit = async (data:UpdateImageFormValues) => {
        try {
            console.log(data);
            const formData = new FormData();
            if(watchFile) formData.append("file", watchFile);
            await updateImage(formData).unwrap();
            toast.success("Image updated successfully!");
            reset();
        } catch (err) {
            toast.error("Failed to update image. Please try again.");
            console.log(err);
        }
    }
    useEffect(()=>{
        const getUser = async()=>{
            setUser(fetchedUser)
        }
       getUser();
        return ()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview) // remove the object from memory
        }
        }, [reset, watchFile, fetchedUser])
  return (
    <Container component={Paper} maxWidth="md" sx={{ borderRadius: 3, mt: 4, p: 3 }}>
            <Typography variant="h5" textAlign="center">Update Profile Image</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
                <Box display="flex" alignItems="center" alignContent="center" justifyContent="space-between" gap={2}>
                    <Box flex={1}>
                        <AppDropzone name="imageFile" control={control} />
                    </Box>
                    <Box flex={1} display="flex" alignItems="center">
                    <img
                        src={watchFile?.preview || user?.pictureUrl || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"}
                        alt={user?.email || "user profile image"}
                        style={{height:150, marginRight:20}}
                        />
                    </Box>
                </Box>
                <Button type="submit" variant="contained" disabled={isLoading}>
                    Update Image
                </Button>
            </Box>
        </Container>
  )
}
export default UpdateImageForm