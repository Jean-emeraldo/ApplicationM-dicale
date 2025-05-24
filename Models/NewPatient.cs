using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class NewPatient
    {
        [Required(ErrorMessage = "Veuillez saisir l'adresse email")]
        [EmailAddress(ErrorMessage = "Veuillez saisir une adresse email valide")]
        [Display(Name = "Adresse Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Veuillez saisir le mot de passe")]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de passe")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Veuillez saisir le nom complet")]
        [Display(Name = "Nom Complet")]
        public string FullName { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [Display(Name = "Date de Naissance")]
        public DateTime DateOfBirth { get; set; }

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

        [Display(Name = "Dernière connexion")]
        public DateTime? LastLoginDate { get; set; }

        public void UpdateLastLoginDate()
        {
            LastLoginDate = DateTime.Now;
        }
    }
}
