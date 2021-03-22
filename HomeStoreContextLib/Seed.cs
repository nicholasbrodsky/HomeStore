using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeStoreEntityLib;
using Microsoft.AspNetCore.Identity;

namespace HomeStoreContextLib
{
    public class Seed
    {
        public static async Task SeedData(HomeStoreContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Nick", UserName = "nbrodsky", Email = "nick@me.com"},
                    new AppUser { DisplayName = "Jenny", UserName = "jhosler", Email = "jenny@me.com"},
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            context.SaveChanges();
        }
    }
}