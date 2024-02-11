using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T>
{
    public PaginationMetaData MetaData { get; set; }
    public PagedList(List<T> items, int pageNumber, int pageSize, int totalCount)
    {
        MetaData = new()
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int) Math.Ceiling(totalCount / (double) pageSize)
        };

        AddRange(items);
    }

    public async static Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var totalCount = await query.CountAsync();

        var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();

        return new PagedList<T>(items, pageNumber, pageSize, totalCount);
    } 
}
