using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ApplicationMedicale.Models;

namespace ApplicationMedicale.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
    
    public IActionResult SignUp()
    {
        return View();
    }

    public IActionResult APropos()
    {
        return View();
    }

    public IActionResult Medecin()
    {
        return View();
    }

    public IActionResult Patient()
    {
        return View();
    }

    public IActionResult Prescription()
    {
        return View();
    }

    public IActionResult RendezVous()
    {
        return View();
    }

    public IActionResult DossiersMedicaux()
    {
        return View();
    }

    public IActionResult NewPatient()
    {
        return View();
    }

    public IActionResult ApplicationUser()
    {
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
