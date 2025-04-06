using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using KitStoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<User> _userManager, SignInManager<User> _signinManager, RoleManager<IdentityRole> _roleManager, ITokenService _tokenService, ImageService _imageService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userAlreadyExists = await _userManager.FindByEmailAsync(registerDTO.Email);
            if (userAlreadyExists != null)
            {
                return BadRequest("User already exists.");
            }
            var appUser = new User
            {
                UserName = registerDTO.UserName,
                Email = registerDTO.Email,
            };
            var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);
            var roleResult = await _userManager.AddToRoleAsync(appUser, "Member");
            return roleResult.Succeeded ? Ok() : BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginDTO)  {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDTO.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username!");
            }
            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid username or password");
            }
            var userToReturn = new UserReturnDTO
            {
                UserName = user.UserName == null ? "" : user.UserName,
                Email = user.Email == null ? "" : user.Email,
                Token = await _tokenService.CreateToken(user),
            };
            return Ok(userToReturn);
        }

        [HttpPost("assignRole")]
        [Authorize]
        public async Task<IActionResult> AssignRole([FromBody] RoleAssignDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var roleExists = await _roleManager.RoleExistsAsync(model.Role);
            if (!roleExists)
            {
                return BadRequest("Role does not exist");
            }

            var result = await _userManager.AddToRoleAsync(user, model.Role);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to assign role");
            }

            return Ok("Role assigned successfully");
        }


        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (User.Identity?.IsAuthenticated == false) return NoContent();
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new
            {
                user.Email,
                user.UserName,
                Roles = roles
            });
        }


        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            var user = await _userManager.Users.Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (user == null) return Unauthorized();
            user.Address = address;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest("Problem updating user address.");
            return Ok(user.Address);
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetSavedAddress()
        {
            var address = await _userManager.Users.Where(u => u.UserName == User.Identity!.Name)
                .Select(u => u.Address).FirstOrDefaultAsync();
            if (address == null) return NoContent();
            return Ok(address);
        }

        [Authorize]
        [HttpPut("update-email")]
        public async Task<ActionResult> UpdateEmail([FromBody] UpdateEmailDTO updateEmailDto)
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName)) return Unauthorized();

            var user = await _signinManager.UserManager.FindByNameAsync(userName);
            if (user == null) return Unauthorized();


            var emailExists = await _signinManager.UserManager.FindByEmailAsync(updateEmailDto.NewEmail);
            if (emailExists != null) return BadRequest("Email is already in use.");

            var emailResult = await _signinManager.UserManager.SetEmailAsync(user, updateEmailDto.NewEmail);
            if (!emailResult.Succeeded) return BadRequest(emailResult.Errors.Select(e => e.Description));

            var usernameResult = await _signinManager.UserManager.SetUserNameAsync(user, updateEmailDto.NewEmail);

            if (!usernameResult.Succeeded) return BadRequest(usernameResult.Errors.Select(e => e.Description));

            await _signinManager.SignInAsync(user, isPersistent: false); // refresh authentication to update claims

            return Ok(new { message = "Email updated successfully." });

        }

        [Authorize]
        [HttpPut("update-password")]
        public async Task<ActionResult> UpdatePassword([FromBody] UpdatePasswordDTO updatePasswordDto)
        {
            var user = await _signinManager.UserManager.FindByNameAsync(User.Identity!.Name);
            if (user == null) return Unauthorized();

            var result = await _signinManager.UserManager.ChangePasswordAsync(user, updatePasswordDto.CurrentPassword, updatePasswordDto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }

            return Ok(new { message = "Password updated successfully." });

        }

        [Authorize]
        [HttpPut("update-image")]
        public async Task<ActionResult> UpdateImage([FromForm] UpdateImageDTO updateImageDTO)
        {
            var user = await _signinManager.UserManager.FindByNameAsync(User.Identity!.Name);
            if (user == null) return Unauthorized();

            if (updateImageDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateImageDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest($"Error {imageResult.Error.Message}");
                }
                if (!string.IsNullOrEmpty(user.PublicId))
                {
                    await _imageService.DeleteImageAsync(user.PublicId);
                }
                user.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                user.PublicId = imageResult.PublicId;
                var updateResult = await _signinManager.UserManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    return BadRequest(updateResult.Errors.Select(e => e.Description));
                }
            }
            return NoContent();
        }

    }
}
