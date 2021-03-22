using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeStoreContextLib;
using HomeStoreEntityLib;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();
            // using (var scope = host.Services.CreateScope())
            // {
            //     IServiceProvider services = scope.ServiceProvider;
            //     try
            //     {
            //         HomeStoreContext context = services.GetRequiredService<HomeStoreContext>();
            //         var userManager = services.GetRequiredService<UserManager<AppUser>>();
            //         await context.Database.MigrateAsync();
            //         await Seed.SeedData(context, userManager);
            //     }
            //     catch (Exception ex)
            //     {
            //         var logger = services.GetRequiredService<ILogger<Program>>();
            //         logger.LogError(ex, "An error has occurred during migration");
            //     }
            // }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
