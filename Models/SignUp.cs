using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class SignUp
    {
        [Required(ErrorMessage = "Veuillez saisir votre nom complet")]
        [Display(Name = "Nom Complet")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Veuillez saisir votre adresse email")]
        [EmailAddress(ErrorMessage = "Veuillez saisir une adresse email valide")]
        [Display(Name = "Adresse Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Veuillez saisir votre mot de passe")]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de passe")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Veuillez confirmer votre mot de passe")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Les mots de passe ne correspondent pas")]
        [Display(Name = "Confirmer le mot de passe")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [Display(Name = "Date de Naissance")]
        public DateTime? DateOfBirth { get; set; }

        [Display(Name = "Numéro de Téléphone")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Display(Name = "Adresse")]
        public string Address { get; set; } = string.Empty;

        [Display(Name = "Ville")]
        public string City { get; set; } = string.Empty;

        [Display(Name = "Code Postal")]
        public string PostalCode { get; set; } = string.Empty;

        [Display(Name = "Pays")]
        public string Country { get; set; } = string.Empty;

        [Display(Name = "Date d'inscription")]
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
    }
}
