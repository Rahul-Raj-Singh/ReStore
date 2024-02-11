using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions;

public static class PaginationExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetaData metaData)
    {
        var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

        response.Headers.Append(nameof(PaginationMetaData), JsonSerializer.Serialize(metaData, options));
        response.Headers.Append("Access-Control-Expose-Headers", nameof(PaginationMetaData));
    }
}
