namespace api.Dtos
{
	public class CreateCompleteTaskDto
	{
		public int TaskId {get; set;}
		public string Completed {get; set;} = null!;
	}

	public class ReturnCompleteTaskDto
	{
		public List<CompleteTaskItemDto> CompletedTaskDates {get; set;} = null!;
	}

	public class CompleteTaskItemDto
	{
		public int Id {get; set;}
		public string Completed {get; set;} = null!;
	}
}
