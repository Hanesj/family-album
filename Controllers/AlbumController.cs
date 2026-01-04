using FamilyAlbum.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FamilyAlbum.Controllers;

[Route("Album")]
public class AlbumController : Controller
{

    private readonly AppDBContext _dbContext;

    public AlbumController(AppDBContext dbContext)
    {
        _dbContext = dbContext;
        
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }
    [HttpGet("{name}")]
    public async Task<IActionResult> Album([FromRoute] string name)
    {
        var test = await _dbContext.Images.FirstOrDefaultAsync();
        System.Console.WriteLine(name);
        System.Console.WriteLine(test);
        ViewData["Name"] = name;
        return View(test);
    }
}