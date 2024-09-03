using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class Subtask {
		public int Id {get; set;}
		public int TaskId {get; set;}
		[ForeignKey("TaskId")]
		public Task Task {get; set;} = null!;
		public string Description {get; set;} = null!;

		public List<CompleteSubtask> CompleteSubtasks = new List<CompleteSubtask>();
		public List<SkipSubtask> SkipSubtasks = new List<SkipSubtask>();
	}
}
