using System.Security.Claims;

namespace KitStoreAPI.Extentions
{
    public static class UserExtentions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Identity?.Name ?? throw new UnauthorizedAccessException();
        }
    }
}
