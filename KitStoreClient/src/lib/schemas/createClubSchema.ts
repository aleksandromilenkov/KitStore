import { z } from "zod";
import { Leagues } from "../../app/models/leagues";
import { Countries } from "../../app/models/countries";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, { message: "File must be uploaded"})
.transform(file=>({
    ...file,
    preview: URL.createObjectURL(file)
}))

export const createClubSchema = z.object({
    name: z.string({required_error: "Name of club is required"}),
    country: z.nativeEnum(Countries, {required_error: "Country is required"}),
    league: z.nativeEnum(Leagues, {required_error: "League is required"}),
    file: fileSchema.optional()
}).refine((data)=> data.file, {message:"Please provide an image", path: ['file']} )

export type CreateClubSchema = z.infer<typeof createClubSchema>;