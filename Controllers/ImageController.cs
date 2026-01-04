using FamilyAlbum.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FamilyAlbum.Controllers;

[Route("Image")]
public class ImageController: Controller
{
    private readonly AppDBContext _dbContext;

    public ImageController(AppDBContext dBContext)
    {
        _dbContext = dBContext;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        try
        {
            var images = await _dbContext.Images.ToListAsync();
            if(images != null)
            {
                return View(images);
            }
            return NotFound();
        }
        catch
        {
            return BadRequest();
        }
    }
}