using HomeStoreEntityLib;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HomeStoreContextLib
{
    public class HomeStoreContext : IdentityDbContext<AppUser>
    {
        public DbSet<StoreItem> StoreItems { get; set; }
        public HomeStoreContext(DbContextOptions options) : base(options)
        {

        }
    }
}
