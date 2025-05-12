using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;


namespace MediCare.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Veuillez saisir votre nom complet")]
        [Display(Name = "Nom Complet")]
        public required string FullName { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Date d'inscription")]
        public DateTime RegistrationDate { get; set; }
    }
}
