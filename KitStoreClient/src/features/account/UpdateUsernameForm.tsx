import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateUsernameMutation } from "./accountApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const updateUsernameSchema = z.object({
    newUsername: z.string().min(2, "Username must be at least 2 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(/^[a-zA-Z0-9_.-]*$/, "Username can only contain letters, numbers, underscores, periods, and hyphens"),
});

type UpdateUsernameFormValues = z.infer<typeof updateUsernameSchema>;

const UpdateUsernameForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<UpdateUsernameFormValues>({
        resolver: zodResolver(updateUsernameSchema),
    });

    const [updateUsername, { isLoading }] = useUpdateUsernameMutation();

    const onSubmit = async (data: UpdateUsernameFormValues) => {
        try {
            await updateUsername(data).unwrap();
            toast.success("Username updated successfully!");
            reset();
        } catch (err) {
            toast.error("Failed to update username. Please try again.");
            console.log(err);
        }
    };

    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, mt: 4, p: 3 }}>
            <Typography variant="h5" textAlign="center">Update Username</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                    label="New Username"
                    fullWidth
                    {...register("newUsername")}
                    error={!!errors.newUsername}
                    helperText={errors.newUsername?.message}
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    Update Username
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateUsernameForm;
