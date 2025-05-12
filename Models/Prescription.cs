using System;
using System.ComponentModel.DataAnnotations;

namespace MediCare.Models
{
    public class Prescription
    {
        [Key]
        public int Id { get; set; } 

        [Required]
        [StringLength(255)]
        public required string Medicament { get; set; } 

        [Required]
        public required string Posologie { get; set; } 

        [Required]
        public int PatientId { get; set; } 

        [Required]
        public int MedecinId { get; set; } 

        [Required]
        public DateTime DatePrescription { get; set; } 

     
        public Prescription()
        {
            Medicament = string.Empty; 
            Posologie = string.Empty; 
        }
    }
}
