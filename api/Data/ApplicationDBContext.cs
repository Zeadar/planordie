using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
	public class ApplicationDBContext : IdentityDbContext<User>
	{
		public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
		{
			
		}

		public DbSet<User> Users {get; set;}
		public DbSet<api.Models.Task> Tasks {get; set;}
		public DbSet<CompleteTask> CompleteTasks {get; set;}
		public DbSet<SkipTask> SkipTasks {get; set;}
		public DbSet<Subtask> Subtasks {get; set;}
		public DbSet<CompleteSubtask> CompleteSubtasks {get; set;}
		public DbSet<SkipSubtask> SkipsubTasks {get; set;}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// builder.Entity<Models.Task>(task => task.HasKey(k => new { k.UserId }));
			// builder.Entity<Models.Task>()
			// 	.HasOne(u => u.User)
			// 	.WithMany(u => u.Tasks)
			// 	.HasForeignKey(p => p.UserId);Task

			List<IdentityRole> roles = new List<IdentityRole>
			{
				new IdentityRole()
				{
					Name = "User",
					NormalizedName = "USER",
				}
			};
			builder.Entity<IdentityRole>().HasData(roles);
		}
	}
}
