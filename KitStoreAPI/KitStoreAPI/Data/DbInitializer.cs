using KitStoreAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Data
{
    public class DbInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope(); // because DependencyInjection can't be used before app.Run(), we must take app.Services.CreateScope which then takes ServiceProvider and then takes the Database
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retreive store context");
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
                ?? throw new InvalidOperationException("Failed to retreive user manager");

            await SeedData(context, userManager);
        }
        private static async Task SeedData(StoreContext context, UserManager<User> userManager)
        {
            context.Database.Migrate(); // Apply migrations

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "asd@asd.com",
                    Email = "asd@asd.com",
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@admin.com",
                    Email = "admin@admin.com",
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            if (!context.Kits.Any())
            {
                // Create the club first
                var club = new Club
                {
                    Name = "Arsenal",
                    PictureUrl = "asd",
                    Country = Enums.Countries.England,
                    League = Enums.Leagues.PremierLeague
                };

                // Add the club to the context
                context.Clubs.Add(club);
                await context.SaveChangesAsync(); // Ensure Club is saved and has an Id before associating it with a Kit

                var kits = new List<Kit>() {
                new Kit(){
                    PictureUrl = "/images/kits/arsenal-home-2025.png",
                    QuantityInStock = 100,
                    ClubId = club.Id, // Use ClubId to associate Kit with the Club
                    Club = club, // You can either set ClubId or Club, EF will automatically handle the FK
                    SeasonYear = 2025,
                    KitType = Enums.KitType.Home,
                },
                new Kit(){
                    PictureUrl = "/images/products/arsenal-away-2025.png",
                    QuantityInStock = 100,
                    ClubId = club.Id, // Use ClubId to associate Kit with the Club
                    Club = club, // You can either set ClubId or Club, EF will automatically handle the FK
                    SeasonYear = 2025,
                    KitType = Enums.KitType.Away,
                },
                 new Kit(){
                    PictureUrl = "/images/products/arsenal-third-2025.png",
                    QuantityInStock = 100,
                    ClubId = club.Id, // Use ClubId to associate Kit with the Club
                    Club = club, // You can either set ClubId or Club, EF will automatically handle the FK
                    SeasonYear = 2025,
                    KitType = Enums.KitType.Third,
                },
                };

                context.Kits.AddRange(kits);
                await context.SaveChangesAsync(); // Save Kit and ensure it's persisted with the reference to the Club
            }
        }

    }
}
