using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationMedicale.Models
{
    public class NewPatient
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom complet est requis.")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le mot de passe est requis.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le nom d'utilisateur est requis.")]
        public string User { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string PhoneNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string PostalCode { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        public DateTime? LastLoginDate { get; set; }

        public void UpdateLastLoginDate()
        {
            LastLoginDate = DateTime.Now;
        }
    }
}

