using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class SkipSubtask {
		public int Id {get; set;}
		public int SubtaskId;
		[ForeignKey("SubtaskId")]
		public Subtask Subtask {get; set;} = null!;
		public DateOnly Completed {get; set;}
	}
}
