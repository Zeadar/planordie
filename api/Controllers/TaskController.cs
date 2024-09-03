using System.Security.Claims;
using api.Data;
using api.Dtos;
using api.Extensions;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{

	[Route("api/task")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ApplicationDBContext context;
		private readonly UserManager<User> userManager;
		public TaskController(ApplicationDBContext context, UserManager<User> userManager)
		{
			this.context = context;
			this.userManager = userManager;
		}

		[HttpGet]
		[Authorize]
		public async Task<IActionResult> GetAll()
		{
			var tasks = await context.Tasks.ToListAsync();

			var dto = tasks.Select(task => new GetTaskDto()
			{
				Id = task.Id,
				Title = task.Title,
				Description = task.Description,
				AssignDate = task.AssignDate,
				RecurringMonth = task.RecurringMonth,
				RecurringN = task.RecurringN,
				RecurringStop = task.RecurringStop,
			});

			return Ok(dto);
		}

		[HttpPost]
		[Authorize]
		public async Task<IActionResult> Create(CreateTaskDto dto)
		{
			//   ↓ NULL
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

			// api.Models.Task task = new api.Models.Task()
			// {
			// 	UserId = userId, //← Null
			// 	Title = dto.Title,
			// 	Description = dto.Description,
			// 	AssignDate = dto.AssignDate,
			// 	RecurringMonth = dto.RecurringMonth,
			// 	RecurringN = dto.RecurringN,
			// 	RecurringStop = dto.RecurringStop,
			// };
			// var username = User.GetUsername();
			// if (username == null)
			// {
			// 	return BadRequest();
			// }
			if (!User.Identity.IsAuthenticated) {
     				return Redirect("/Identity/Account/AccessDenied");
				}

			// if (dto.UserId != userId)
			// {
 		// 		return Redirect("/Identity/Account/AccessDenied");
			// }

			var user = await userManager.FindByIdAsync(userId);
			
			api.Models.Task task = new api.Models.Task()
			{
			    UserId = user.Id,
			    Title = dto.Title,
			    Description = dto.Description,
			    AssignDate = dto.AssignDate,
			    RecurringMonth = dto.RecurringMonth,
			    RecurringN = dto.RecurringN,
			    RecurringStop = dto.RecurringStop,
			};

			// task.User = user;
 
			// Console.WriteLine($"Creating task with UserId: {task.UserId}");
 
			// await context.Tasks.AddAsync(task);
			// await context.SaveChangesAsync();
 
			// return Ok();

			await context.Tasks.AddAsync(task);

			/* await context.Tasks.AddAsync(new Models.Task()
				{
					// UserId = user.Id,
					UserId = userId,
					Title = dto.Title,
					Description = dto.Description,
					AssignDate = dto.AssignDate,
					RecurringMonth = dto.RecurringMonth,
					RecurringN = dto.RecurringN,
					RecurringStop = dto.RecurringStop,
				}
			); */

			task.User = user;
			await context.SaveChangesAsync();

			return Ok();
		}

		[HttpPut("{id:int}")]
		[Authorize]
		public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateTaskDto dto)
		{
			var task = await context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound();
			}

			task.Title = dto.Title;
			task.Description = dto.Description;
			task.AssignDate = dto.AssignDate;
			task.RecurringMonth = dto.RecurringMonth;
			task.RecurringN = dto.RecurringN;
			task.RecurringStop = dto.RecurringStop;

			context.Tasks.Update(task);
			await context.SaveChangesAsync();
			return Ok();
		}

		[HttpDelete("{id:int}")]
		[Authorize]
		public async Task<IActionResult> Delete([FromRoute] int id)
		{
			var task = await context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound();
			}
			
			context.Tasks.Remove(task);
			await context.SaveChangesAsync();
			return NoContent();
		}
		
	}
}
