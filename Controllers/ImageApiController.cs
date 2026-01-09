using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace FamilyAlbum.Controllers;

[ApiController]
[Route("api/images")]
public class ImageApiController : ControllerBase
{
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if(file == null || file.Length == 0)
        {
            return BadRequest("No file selected");
        }

        var filePath = Path.Combine("wwwroot/images", file.FileName);

        using var stream = new FileStream(filePath, FileMode.Create);

        await file.CopyToAsync(stream);

        return Ok(new {file.FileName});
    }
}