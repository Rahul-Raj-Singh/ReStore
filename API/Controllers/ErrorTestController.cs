using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorTestController : ControllerBase
{

    public ErrorTestController()
    {
    }

    [HttpGet("not-found")]
    public IActionResult Get404()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult Get400()
    {
        return BadRequest(
            new ProblemDetails{ Title = "I do not like your input!" }
        );
    }
    
    [HttpGet("validation-error")]
    public IActionResult Get400ValidationError()
    {
        ModelState.AddModelError("Problem 1", "Problem 1 description");
        ModelState.AddModelError("Problem 2", "Problem 2 description");

        return ValidationProblem();
    }

    [HttpGet("not-authenticated")]
    public IActionResult Get401()
    {
        return Unauthorized();
    }
    
    [HttpGet("server-error")]
    public IActionResult Get500()
    {
        throw new Exception("Server broke!");
    }
    
}
