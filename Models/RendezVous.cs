using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class RendezVous
    {
        [Required(ErrorMessage = "Veuillez saisir un ID valide pour le rendez-vous")]
        [Display(Name = "ID du Rendez-Vous")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Veuillez saisir la date et l'heure du rendez-vous")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Date et Heure")]
        public DateTime DateRendezVous { get; set; }

        [Required(ErrorMessage = "Veuillez saisir l'ID du patient")]
        [Display(Name = "ID Patient")]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Veuillez saisir l'ID du médecin")]
        [Display(Name = "ID Médecin")]
        public int MedecinId { get; set; }

        [Required(ErrorMessage = "Veuillez sélectionner un statut")]
        [Display(Name = "Statut")]
        public required string Statut { get; set; }
    }
}
