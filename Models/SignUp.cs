using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationMedicale.Models
{
    public class SignUp
    {
        [Key] // Ajout de l'attribut Key pour définir la clé primaire
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom complet est requis.")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le nom d'utilisateur est requis.")]
        public string User { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le mot de passe est requis.")]
        [MinLength(6, ErrorMessage = "Le mot de passe doit contenir au moins 6 caractères.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "La confirmation du mot de passe est requise.")]
        [Compare("Password", ErrorMessage = "Les mots de passe ne correspondent pas.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [Display(Name = "Date de naissance")]
        public DateTime? DateOfBirth { get; set; }

        [Phone(ErrorMessage = "Le numéro de téléphone est invalide.")]
        [Display(Name = "Numéro de téléphone")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Display(Name = "Adresse")]
        public string Address { get; set; } = string.Empty;

        [Display(Name = "Ville")]
        public string City { get; set; } = string.Empty;

        [Display(Name = "Code postal")]
        public string PostalCode { get; set; } = string.Empty;

        [Display(Name = "Pays")]
        public string Country { get; set; } = string.Empty;
    }
}
