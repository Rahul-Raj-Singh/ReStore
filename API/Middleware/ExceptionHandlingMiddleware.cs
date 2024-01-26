
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionHandlingMiddleware : IMiddleware
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(IWebHostEnvironment env, ILogger<ExceptionHandlingMiddleware> logger)
    {
       _env = env;
       _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            
            context.Response.StatusCode = 500;

            var responseBody = new ProblemDetails
            {
                Title = "Server Error",
                Detail = _env.IsDevelopment() ? ex.StackTrace.ToString() : null,
                Status = 500
            };

            await context.Response.WriteAsJsonAsync(responseBody, 
            new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase});
        }
    }
}
