using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class Medecin
    {
        [Required(ErrorMessage = "Veuillez saisir un ID valide")]
        [Display(Name = "ID Médecin")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le nom du médecin")]
        [Display(Name = "Nom")]
        public required string Nom { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le prénom du médecin")]
        [Display(Name = "Prénom")]
        public required string Prenom { get; set; }

        [Required(ErrorMessage = "Veuillez sélectionner une spécialité")]
        [Display(Name = "Spécialité")]
        public required string Specialite { get; set; }

        [Required(ErrorMessage = "Veuillez saisir un numéro RPPS valide (11 chiffres)")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "Le numéro RPPS doit contenir exactement 11 chiffres")]
        [RegularExpression("^[0-9]{11}$", ErrorMessage = "Le numéro RPPS doit contenir exactement 11 chiffres")]
        [Display(Name = "Numéro RPPS")]
        public required string NumeroRPPS { get; set; }

        [Required(ErrorMessage = "Veuillez saisir un email professionnel valide")]
        [EmailAddress(ErrorMessage = "L'adresse email n'est pas valide")]
        [Display(Name = "Email Professionnel")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Veuillez saisir un numéro de téléphone valide")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Le numéro de téléphone doit contenir exactement 10 chiffres")]
        [RegularExpression("^[0-9]{10}$", ErrorMessage = "Le numéro de téléphone doit contenir exactement 10 chiffres")]
        [Display(Name = "Téléphone")]
        public required string Telephone { get; set; }
    }
}
