import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "./accountApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const updatePasswordSchema = z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<UpdatePasswordFormValues>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    const onSubmit = async (data: UpdatePasswordFormValues) => {
        try {
            await updatePassword(data).unwrap();
            toast.success("Password updated successfully!");
            reset();
        } catch (err) {
            toast.error("Failed to update password. Please try again.");
            console.log(err);
        }
    };

    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, mt: 4, p: 3 }}>
            <Typography variant="h5" textAlign="center">Update Password</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    {...register("currentPassword")}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    {...register("newPassword")}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    Update Password
                </Button>
            </Box>
        </Container>
    );
};

export default UpdatePasswordForm;
