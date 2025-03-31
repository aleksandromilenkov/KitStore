using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Middlewares;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole>()
  .AddEntityFrameworkStores<StoreContext>();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();

app.UseCors(options =>
{
    options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://localhost:3000");
});

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); // ex: api/login

await DbInitializer.InitDb(app);
app.Run();
