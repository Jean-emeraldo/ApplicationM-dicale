using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class DossierMedical
    {
        [Required(ErrorMessage = "Veuillez saisir un ID valide pour le dossier médical.")]
        [Display(Name = "ID du Dossier")]
        [StringLength(50, ErrorMessage = "L'ID du dossier ne peut pas dépasser 50 caractères.")]
        public required string Id { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le nom du dossier.")]
        [Display(Name = "Nom du Dossier")]
        [StringLength(100, ErrorMessage = "Le nom du dossier ne peut pas dépasser 100 caractères.")]
        public required string Nom { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la date de création.")]
        [DataType(DataType.Date)]
        [Display(Name = "Date de Création")]
        public DateTime DateCreation { get; set; }

        [Required(ErrorMessage = "Veuillez saisir le médecin responsable.")]
        [Display(Name = "Médecin Responsable")]
        [StringLength(100, ErrorMessage = "Le nom du médecin responsable ne peut pas dépasser 100 caractères.")]
        public required string MedecinResponsable { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la dernière mise à jour.")]
        [DataType(DataType.Date)]
        [Display(Name = "Dernière Mise à Jour")]
        public DateTime DerniereMiseAJour { get; set; }

        [Required(ErrorMessage = "Veuillez sélectionner un statut.")]
        [Display(Name = "Statut")]
        [RegularExpression("^(Actif|Inactif)$", ErrorMessage = "Le statut doit être 'Actif' ou 'Inactif'.")]
        public required string Statut { get; set; }

        [Display(Name = "Description")]
        [StringLength(500, ErrorMessage = "La description ne peut pas dépasser 500 caractères.")]
        public string? Description { get; set; }

        [Display(Name = "Antécédents Médicaux")]
        [StringLength(1000, ErrorMessage = "Les antécédents médicaux ne peuvent pas dépasser 1000 caractères.")]
        public string? AntecedentsMedicaux { get; set; }
    }
}
