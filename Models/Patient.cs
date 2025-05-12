using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class Patient
    {
        [Required(ErrorMessage = "Veuillez saisir un ID valide")]
        [Display(Name = "ID")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le nom du patient")]
        [Display(Name = "Nom")]
        public required string Nom { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le prénom du patient")]
        [Display(Name = "Prénom")]
        public required string Prenom { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la date de naissance")]
        [DataType(DataType.Date)]
        [Display(Name = "Date de Naissance")]
        public DateTime DateNaissance { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le genre")]
        [Display(Name = "Genre")]
        public required string Genre { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le numéro de téléphone")]
        [Phone(ErrorMessage = "Le numéro de téléphone n'est pas valide")]
        [Display(Name = "Téléphone")]
        public required string Telephone { get; set; }

        [EmailAddress(ErrorMessage = "L'adresse email n'est pas valide")]
        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Display(Name = "Adresse")]
        public string? Adresse { get; set; }

        [Display(Name = "Groupe Sanguin")]
        public string? GroupeSanguin { get; set; }

        [Display(Name = "Médecin Traitant")]
        public string? MedecinTraitant { get; set; }

        [Display(Name = "Allergies connues")]
        public string? Allergies { get; set; }

        [Display(Name = "Antécédents médicaux")]
        public string? AntecedentsMedicaux { get; set; }

        [Display(Name = "Dernière Visite")]
        public DateTime DerniereVisite { get; set; }

        [Display(Name = "Statut")]
        public string? Statut { get; set; }
    }
}
