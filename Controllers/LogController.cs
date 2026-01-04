using Microsoft.AspNetCore.Mvc;

namespace FamilyAlbum.Controllers;
[ApiController]
[Route("/api/logs")]
public class LogController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new {message = "Works!"});
    }
}