import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateEmailMutation } from "./accountApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const updateEmailSchema = z.object({
    newEmail: z.string().email("Invalid email address"),
});

type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;

const UpdateEmailForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<UpdateEmailFormValues>({
        resolver: zodResolver(updateEmailSchema),
    });

    const [updateEmail, { isLoading }] = useUpdateEmailMutation();

    const onSubmit = async (data: UpdateEmailFormValues) => {
        try {
            await updateEmail(data).unwrap();
            toast.success("Email updated successfully!");
            reset();
        } catch (err) {
            toast.error("Failed to update email. Please try again.");
            console.log(err);
        }
    };

    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, mt: 4, p: 3 }}>
            <Typography variant="h5" textAlign="center">Update Email</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                    label="New Email"
                    fullWidth
                    {...register("newEmail")}
                    error={!!errors.newEmail}
                    helperText={errors.newEmail?.message}
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    Update Email
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateEmailForm;
