using System.Security.Claims;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
	
[Route("api/user")]
[ApiController]
	public class UserController : ControllerBase
	{
		// private readonly ApplicationDBContext context;
		private readonly UserManager<User> userManager;
		private readonly ITokenService tokenService;
		private readonly SignInManager<User> signInManager;

		public UserController(UserManager<User> user, ITokenService tokenService, SignInManager<User> signInManager)
		{
			this.userManager = user;
			this.tokenService = tokenService;
			this.signInManager = signInManager;
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> Delete()
		{

			// Console.WriteLine("Logged in NAME");
			// Console.WriteLine(User.Identity.Name);
			// var user = await userManager.Users.FirstOrDefaultAsync(user => user.UserName );

		    if (!User.Identity.IsAuthenticated)
		    {
		        return Redirect("/Identity/Account/AccessDenied");
		    }

		    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
		    if (userId == null)
		    {
		        return Unauthorized();
		    }

			var user = await userManager.Users.FirstOrDefaultAsync(user => user.Id == userId);

			if (user == null)
			{
				return NotFound();
			}

			await userManager.DeleteAsync(user);

			return NoContent();
			
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] CreateUserDto dto)
		{
			if(!ModelState.IsValid)
				return BadRequest(ModelState);

			var user = await userManager.Users.FirstOrDefaultAsync(user => user.UserName == dto.Username);

			if (user == null)
				return Unauthorized("Invalid username");

			var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

			if (!result.Succeeded)
			{
				return Unauthorized("Invalid Password");
			}

			return Ok(
				new TokenDto()
				{
					Username = dto.Username,
					Token = tokenService.CreateToken(user),
				}
			);
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] CreateUserDto dto)
		{
			try
			{
				if(!ModelState.IsValid)
					return BadRequest();

				var user = new User()
				{
					UserName = dto.Username,
				};

				var createdUser = await userManager.CreateAsync(user, dto.Password);

				if (createdUser.Succeeded)
				{
					var roleResult = await userManager.AddToRoleAsync(user, "User");
					if (roleResult.Succeeded)
					{
						return Ok(
							new TokenDto()
							{
								Username = dto.Username,
								Token = tokenService.CreateToken(user),
							}
						);
					}
					else
					{
						return StatusCode(500, roleResult.Errors);
					}
				}
				else 
				{
					return StatusCode(500, createdUser.Errors);
				}


			}
			catch (Exception ex)
			{
				return StatusCode(500, ex);
			}

		}
		
	}
}
