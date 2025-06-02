using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MediCare.Data;
using MediCare.Models;
using Microsoft.AspNetCore.Identity;
using ApplicationMedicale.Models;

namespace ApplicationMedicale.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public HomeController(
            ILogger<HomeController> logger,
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult Index() => View();

        [HttpGet]
        public IActionResult NewPatient() => View();

        [HttpPost]
        public async Task<IActionResult> NewPatient(string User, string Password)
        {
            _logger.LogInformation("Tentative de connexion pour l'utilisateur : {User}", User);

            if (string.IsNullOrWhiteSpace(User) || string.IsNullOrWhiteSpace(Password))
            {
                ViewBag.ErrorMessage = "Nom d'utilisateur et mot de passe sont requis.";
                return View();
            }

            var user = await _userManager.FindByNameAsync(User);
            if (user == null)
            {
                ViewBag.ErrorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
                return View();
            }

            var result = await _signInManager.PasswordSignInAsync(User, Password, false, false);
            if (result.Succeeded)
            {
                user.UpdateLastLoginDate();
                await _userManager.UpdateAsync(user);
                HttpContext.Session.SetString("UserAuthenticated", "true");
                return RedirectToAction("ApplicationUser");
            }

            ViewBag.ErrorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
            return View();
        }

        [HttpGet]
        public IActionResult SignUp() => View();

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUp model)
        {
            _logger.LogInformation("Tentative d'inscription pour l'utilisateur : {User}", model.User);

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var existingUser = await _userManager.FindByNameAsync(model.User);
            if (existingUser != null)
            {
                ModelState.AddModelError("User", "Ce nom d'utilisateur est déjà utilisé.");
                return View(model);
            }

            var newUser = new ApplicationUser
            {
                UserName = model.User,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                DateOfBirth = model.DateOfBirth,
                Address = model.Address,
                City = model.City,
                PostalCode = model.PostalCode,
                Country = model.Country,
                RegistrationDate = DateTime.Now
            };

            var result = await _userManager.CreateAsync(newUser, model.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("Utilisateur créé avec succès : {User}", model.User);
                await _signInManager.SignInAsync(newUser, false);
                HttpContext.Session.SetString("UserAuthenticated", "true");
                return RedirectToAction("ApplicationUser");
            }
            else
            {
                _logger.LogWarning("Échec de la création de l'utilisateur : {User}", model.User);
                foreach (var error in result.Errors)
                {
                    _logger.LogWarning("Erreur : {Error}", error.Description);
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return View(model);
        }

        public IActionResult ApplicationUser()
        {
            if (HttpContext.Session.GetString("UserAuthenticated") != "true")
            {
                return RedirectToAction("NewPatient");
            }

            return View();
        }

        public IActionResult APropos() => View();
        public IActionResult Medecin() => View();
        public IActionResult Patient() => View();
        public IActionResult Prescription() => View();
        public IActionResult RendezVous() => View();
        public IActionResult DossiersMedicaux() => View();
        public IActionResult Privacy() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
