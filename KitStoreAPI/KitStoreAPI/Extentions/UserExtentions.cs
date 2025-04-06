using System.Security.Claims;

namespace KitStoreAPI.Extentions
{
    public static class UserExtentions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Identity?.Name ?? throw new UnauthorizedAccessException();
        }
        public static string GetUserEmail(this ClaimsPrincipal user)
        {
            var emailClaim = user.FindFirst(ClaimTypes.Email);
            if (emailClaim != null)
            {
                return emailClaim.Value;
            }
            throw new UnauthorizedAccessException("User email claim is not available.");
        }
    }
}
