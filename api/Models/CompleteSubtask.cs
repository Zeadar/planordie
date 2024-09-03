using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class CompleteSubtask {
		public int Id {get; set;}
		public int SubtaskId {get; set;}
		[ForeignKey("SubtaskId")]
		public Subtask Subtask {get; set;} = null!;
		public DateOnly Completed {get; set;}
	}
}
