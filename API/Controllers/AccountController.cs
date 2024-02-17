using API.DTO;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<User> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user is null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

        var token = await _tokenService.GenerateToken(user);

        return Ok(new UserDto {Email = user.Email, Token = token});
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        var user = new User {UserName = registerDto.Username, Email = registerDto.Email};

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Errors.Any())
        {
            foreach(var error in result.Errors) ModelState.AddModelError(error.Code, error.Description);
            
            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, "member");

        return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        return Ok(user);
    }

    
}
