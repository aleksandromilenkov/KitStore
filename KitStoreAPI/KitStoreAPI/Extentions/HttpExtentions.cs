﻿using KitStoreAPI.RequestHelpers;
using Microsoft.Net.Http.Headers;
using System.Text.Json;

namespace KitStoreAPI.Extentions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationMetadata metadata)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, options));
            response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination"); // allowing frontend access this header "Pagination"
        }
    }
}
