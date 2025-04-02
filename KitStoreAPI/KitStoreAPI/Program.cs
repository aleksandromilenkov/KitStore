using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using KitStoreAPI.MappingProfiles;
using KitStoreAPI.Middlewares;
using KitStoreAPI.Repositories;
using KitStoreAPI.Services;
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
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IClubRepository, ClubRepository>();
builder.Services.AddScoped<IKitRepository, KitRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
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
