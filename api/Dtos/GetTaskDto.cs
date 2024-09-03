using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
	public class GetTaskDto
	{
		public int Id {get; set;}
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string Title {get; set;} = null!;
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string Description {get; set;} = null!;
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string AssignDate {get; set;} = null!;
		public bool RecurringMonth {get; set;}
		public int RecurringN {get; set;}
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string RecurringStop {get; set;} = null!;
    }
}
