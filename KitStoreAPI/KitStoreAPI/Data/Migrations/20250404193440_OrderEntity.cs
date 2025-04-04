using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KitStoreAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrderEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AppCoupon_AmountOff",
                table: "Carts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppCoupon_CouponId",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppCoupon_Name",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AppCoupon_PercentOff",
                table: "Carts",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AppCoupon_PromotionCode",
                table: "Carts",
                type: "int",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientSecret",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentIntentId",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppCoupon_AmountOff",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "AppCoupon_CouponId",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "AppCoupon_Name",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "AppCoupon_PercentOff",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "AppCoupon_PromotionCode",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "ClientSecret",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "PaymentIntentId",
                table: "Carts");
        }
    }
}
