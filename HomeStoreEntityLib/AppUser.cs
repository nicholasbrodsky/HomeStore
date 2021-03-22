using System;
using Microsoft.AspNetCore.Identity;

namespace HomeStoreEntityLib
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
