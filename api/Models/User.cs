// using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
	public class User : IdentityUser
	{
		// [Key]
		// public string Username {get; set;} = null!;
		// public string Password {get; set;} = null!;
		// public bool Admin {get; set;}

		public List<Task> Tasks {get; set;} = new List<Task>();
	}
}
