using Microsoft.AspNetCore.Mvc;

namespace FamilyAlbum.Controllers;

public class HelloWorldController : Controller
{
    public string Index()
    {
        return "Default action";
    }
    public string Welcome()
    {
        return "Welcome page";
    }
}