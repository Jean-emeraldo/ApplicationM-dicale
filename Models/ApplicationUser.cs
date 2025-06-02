using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MediCare.Models; 
using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Veuillez saisir votre nom complet")]
        [Display(Name = "Nom Complet")]
        public string FullName { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [Display(Name = "Date d'inscription")]
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        [Display(Name = "Dernière connexion")]
        public DateTime? LastLoginDate { get; set; }

        [Display(Name = "Nombre de tentatives de connexion échouées")]
        public int FailedLoginAttempts { get; set; } = 0;

        [Display(Name = "Verrouillé jusqu'à")]
        public DateTime? LockoutEndDate { get; set; }

        [Display(Name = "Rôle")]
        public string Role { get; set; } = string.Empty;

        [Display(Name = "Statut")]
        public string Status { get; set; } = "active";

        [Display(Name = "Description")]
        public string Description { get; set; } = string.Empty;

        [Display(Name = "Avatar")]
        public string Avatar { get; set; } = "../images/default-avatar.png";

        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [Display(Name = "Adresse")]
        public string Address { get; set; } = string.Empty;

        [Display(Name = "Ville")]
        public string City { get; set; } = string.Empty;

        [Display(Name = "Code postal")]
        public string PostalCode { get; set; } = string.Empty;

        [Display(Name = "Pays")]
        public string Country { get; set; } = string.Empty;

        public void UpdateLastLoginDate()
        {
            LastLoginDate = DateTime.Now;
        }

        public void IncrementFailedLoginAttempts()
        {
            FailedLoginAttempts++;
        }

        public void ResetFailedLoginAttempts()
        {
            FailedLoginAttempts = 0;
        }
    }
}
