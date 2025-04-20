import { Countries } from "./countries"
import { Kit } from "./kit"

export type Club = {
    id: number,
    name:string,
    publicId:string,
    pictureUrl: string,
    country: Countries,
    kits: Kit[],
}