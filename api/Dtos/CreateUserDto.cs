using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
	public class CreateUserDto
	{
		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string Username {get; set;} = null!;

		[Required]
		[MaxLength(255, ErrorMessage = "Too long")]
		public string Password {get; set;} = null!;
	}
}
