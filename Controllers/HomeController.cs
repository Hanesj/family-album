using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using FamilyAlbum.Models;
using System.Text.Encodings.Web;
using Newtonsoft.Json;

namespace FamilyAlbum.Controllers;

public class HomeController : Controller
{
    public IActionResult Index([FromRoute] int id, [FromQuery] string msg)
    {
        if (id > 0)
        {
            return Ok(HtmlEncoder.Default.Encode($"{JsonConvert.DeserializeObject(msg)} has id: {id}"));
        }
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
