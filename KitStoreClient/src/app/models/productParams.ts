

export type ProductParams = {
    orderBy: string,
    searchTerm?: string,
    kitType: string | null,
    leagues: string[],
    pageNumber: number,
    pageSize: number
}