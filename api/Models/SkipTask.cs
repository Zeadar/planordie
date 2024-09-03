using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class SkipTask {
		public int Id {get; set;}
		public int TaskId {get; set;}
		[ForeignKey("TaskId")]
		public Task Task {get; set;} = null!;
		public DateOnly Completed {get; set;}
	}
}
