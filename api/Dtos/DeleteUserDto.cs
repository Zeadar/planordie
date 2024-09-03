using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
	public class DeleteUserDto
	{
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string Username {get; set;} = null!;
	}
}
