
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace KitStoreAPI.Middlewares
{
    public class ExceptionMiddleware : IMiddleware
    {
        private readonly ILogger _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) {
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
                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new ProblemDetails()
            {
                Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Status = 500,
                Title = ex.Message,
            };

            // correct format for a JSON response:
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}
