using HomeStoreEntityLib;
using Microsoft.EntityFrameworkCore;

namespace HomeStoreContextLib
{
    public class HomeStoreContext : DbContext
    {
        public DbSet<StoreItem> StoreItems { get; set; }
        public HomeStoreContext(DbContextOptions options) : base(options)
        {

        }
    }
}
