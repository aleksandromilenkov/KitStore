import { Club } from "./club"
import { KitTypes } from "./kitTypes"

export type Kit = {
    id: number
    name: string,
    club: Club,
    publicId: string,
    price: number
    pictureUrl: string,
    kitType: KitTypes,
    seasonYear: number
    quantityInStock: number
}