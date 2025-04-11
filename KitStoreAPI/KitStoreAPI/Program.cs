using System.Text.Json.Serialization;
using API.Services;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using KitStoreAPI.MappingProfiles;
using KitStoreAPI.Middlewares;
using KitStoreAPI.Repositories;
using KitStoreAPI.RequestHelpers;
using KitStoreAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestoreAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddScoped<PaymentsService>();
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<DiscountService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IClubRepository, ClubRepository>();
builder.Services.AddScoped<IKitRepository, KitRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<StoreContext>()
.AddDefaultTokenProviders();

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };
});
builder.Services.AddScoped<RoleManager<IdentityRole>>();


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
    .WithOrigins("https://localhost:3000", "http://localhost:3000");
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

await DbInitializer.InitDb(app);
app.Run();
