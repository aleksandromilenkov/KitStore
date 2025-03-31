using System.Reflection.Emit;
using CloudinaryDotNet.Actions;
using KitStoreAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Kit> Kits { get; set; }
        public required DbSet<Club> Clubs { get; set; }
        public required DbSet<Cart> Carts { get; set; }
        public required DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .HasOne(u => u.Cart)
            .WithOne(c => c.User)
            .HasForeignKey<Cart>(c => c.UserId);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole()
                    {
                        Id = "b07d2146-0b19-4ae8-a55f-166ae5ebe7ea",
                        Name = "Member",
                        NormalizedName = "MEMBER"
                    },
                    new IdentityRole()
                    {
                        Id = "71568c76-bd8d-4a11-ab34-37362daee908",
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    }
                );
        }
    }
}
