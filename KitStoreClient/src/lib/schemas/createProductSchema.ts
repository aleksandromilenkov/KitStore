import { z } from "zod";
import { KitTypes } from "../../app/models/kitTypes";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, { message: "File must be uploaded"})
.transform(file=>({
    ...file,
    preview: URL.createObjectURL(file)
}))

export const createProductSchema = z.object({
    clubId: z.number({required_error: "Club is required"}),
    price: z.coerce.number({required_error: "Price is required"}).min(1, "Price must be at least $1.00"),
    kitType: z.nativeEnum(KitTypes, {required_error: "Kit Type is required"}),
    quantityInStock: z.coerce.number({required_error: "Quantity is required"}).min(1, "Quantity must be at least 1"),
    seasonYear: z.coerce.number({required_error: "Season Year is required"}).min(1890, "Latest Season must be at least 1890"),
    pictureUrl: z.string().optional(),
    file: fileSchema.optional()
}).refine((data)=> data.pictureUrl || data.file, {message:"Please provide an image", path: ['file']} )

export type CreateProductSchema = z.infer<typeof createProductSchema>;