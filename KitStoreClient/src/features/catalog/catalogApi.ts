import { createApi } from "@reduxjs/toolkit/query/react";
import { Kit } from "../../app/models/kit";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { ProductParams } from "../../app/models/productParams";
import { Pagination } from "../../app/models/pagination";


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        fetchProducts: builder.query<{items:Kit[], pagination: Pagination}, ProductParams>({
            query:({pageNumber, pageSize, orderBy, searchTerm, kitType, leagues})=>{
                const params = new URLSearchParams();
                params.append("pageNumber", pageNumber.toString());
                params.append("pageSize", pageSize.toString());
                if (orderBy) params.append("orderBy", orderBy);
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (kitType) params.append("kitType", kitType);
                if (leagues && leagues.length > 0) params.append("leagues", leagues.join(","));
                return { url: `kit?${params.toString()}` };
            },
            transformResponse: (response: {items: Kit[], pagination: Pagination}, meta) => {
                const paginationHeader = meta?.response?.headers.get('Pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader) : response.pagination;
                return {
                    items: response.items,
                    pagination
                };
            }
            
        }),
        fetchProductsDetails: builder.query<Kit, number>({
            query:(kitId)=> `kit/${kitId}`
        }),
        fetchFilters: builder.query<{brands: string[], types:string[]}, void>({
            query:()=> "products/filters"
        }),
    })
})

export const {useFetchProductsDetailsQuery, useFetchProductsQuery, useFetchFiltersQuery} = catalogApi;