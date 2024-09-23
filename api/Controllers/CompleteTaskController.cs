using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
	[Route("api/taskcomplete")]
	[ApiController]
	public class TaskCompleteController : ControllerBase
	{
		private readonly ApplicationDBContext context;
		public TaskCompleteController(ApplicationDBContext context)
		{
			this.context = context;
		}

		[HttpGet("{taskId:int}")]
		public async Task<IActionResult> Get([FromRoute] int taskId)
		{
			var completeTasks = await context.CompleteTasks.Where(ct => ct.TaskId == taskId).ToListAsync();
			
			return Ok(new ReturnCompleteTaskDto {
				CompletedTaskDates = completeTasks.Select(ct => new CompleteTaskItemDto(){
					Id = ct.Id,
					Completed = ct.Completed,
				}).ToList(),
			});
		}

		[HttpPost]
		public async Task<IActionResult> Create(CreateCompleteTaskDto dto)
		{
			var task = await context.Tasks.FindAsync(dto.TaskId);

			if (task == null)
			{
				return NotFound();
			}

			CompleteTask completeTask = new CompleteTask()
			{
				TaskId = task.Id,
				Task = task,
				Completed = dto.Completed,
			};

			await context.CompleteTasks.AddAsync(completeTask);
			await context.SaveChangesAsync();

			return Ok();
		}

		[HttpDelete("{id:int}")]
		public async Task<IActionResult> Delete([FromRoute] int id)
		{
			var completeTask = await context.CompleteTasks.FindAsync(id);

			if (completeTask == null)
			{
				return NotFound();
			}

			context.CompleteTasks.Remove(completeTask);
			await context.SaveChangesAsync();

			return Ok();
		}
	}

}
