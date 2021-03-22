using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using HomeStoreEntityLib;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }
        // POST api/account/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user is null)
                return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (result.Succeeded)
            {
                return Ok(new UserDTO
                    {
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Token = _tokenService.CreateToken(user),
                    });
            }
            return Unauthorized();
        }
        // POST api/account/register
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(user => user.Email == registerDTO.Email))
                return BadRequest("Email already exists!");
            if (await _userManager.Users.AnyAsync(user => user.UserName == registerDTO.UserName))
                return BadRequest("UserName already exists!");

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                return Ok(new UserDTO
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                });
            }

            return BadRequest("ERROR registering user!");
        }
        // GET api/account
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return Ok(new UserDTO
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
            });
        }
    }
}