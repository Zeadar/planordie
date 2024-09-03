using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class Task
	{
		public int Id {get; set;}
		public string? UserId {get; set;}
		[ForeignKey("UserId")]
		public User User {get; set;} = null!;
		public string Title {get; set;} = null!;
		public string Description {get; set;} = null!;
		public string AssignDate {get; set;} = null!;
		public bool RecurringMonth {get; set;} = false;
		public int RecurringN {get; set;} = 0;
		public string RecurringStop {get; set;} = null!;

		public List<Subtask> Subtasks {get; set;} = new List<Subtask>();
		public List<SkipTask> SkipTasks {get; set;} = new List<SkipTask>();
		public List<CompleteTask> CompleteTasks{get; set;} = new List<CompleteTask>();
    }
}
