using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class DossierMedical
    {
        [Required(ErrorMessage = "Veuillez saisir un ID valide pour le dossier médical")]
        [Display(Name = "ID du Dossier")]
        public required string Id { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le nom du dossier")]
        [Display(Name = "Nom du Dossier")]
        public required string Nom { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la date de création")]
        [DataType(DataType.Date)]
        [Display(Name = "Date de Création")]
        public DateTime DateCreation { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le médecin responsable")]
        [Display(Name = "Médecin Responsable")]
        public required string MedecinResponsable { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la dernière mise à jour")]
        [DataType(DataType.Date)]
        [Display(Name = "Dernière Mise à Jour")]
        public DateTime DerniereMiseAJour { get; set; }

        [Required(ErrorMessage = "Veuillez sélectionner un statut")]
        [Display(Name = "Statut")]
        public required string Statut { get; set; }

        [Display(Name = "Description")]
        public string? Description { get; set; }

        [Display(Name = "Antécédents Médicaux")]
        public string? AntecedentsMedicaux { get; set; }
    }
}
