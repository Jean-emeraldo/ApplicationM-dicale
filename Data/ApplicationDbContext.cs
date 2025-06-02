using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MediCare.Models;
using ApplicationMedicale.Models;

namespace MediCare.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Medecin> Medecins { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<DossierMedical> DossiersMedicaux { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<RendezVous> RendezVous { get; set; }
        public DbSet<SignUp> SignUps { get; set; }
        public DbSet<NewPatient> NewPatients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuration pour Medecin
            modelBuilder.Entity<Medecin>(entity =>
            {
                entity.Property(m => m.Nom).IsRequired();
                entity.Property(m => m.Prenom).IsRequired();
                entity.Property(m => m.Email).IsRequired();
                entity.Property(m => m.NumeroRPPS).IsRequired().HasMaxLength(11);
                entity.Property(m => m.Telephone).IsRequired().HasMaxLength(10);
                entity.Property(m => m.Specialite).IsRequired();
            });

            // Configuration pour Patient
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(p => p.Nom).IsRequired();
                entity.Property(p => p.Prenom).IsRequired();
                entity.Property(p => p.Genre).IsRequired();
                entity.Property(p => p.Telephone).IsRequired();
            });

            // Configuration pour DossierMedical
            modelBuilder.Entity<DossierMedical>(entity =>
            {
                entity.Property(d => d.Nom).IsRequired();
                entity.Property(d => d.Statut).IsRequired();
                entity.Property(d => d.MedecinResponsable).IsRequired();
            });

            // Configuration pour Prescription
            modelBuilder.Entity<Prescription>(entity =>
            {
                entity.Property(p => p.Medicament).IsRequired().HasMaxLength(255);
                entity.Property(p => p.Posologie).IsRequired();
            });

            // Configuration pour RendezVous
            modelBuilder.Entity<RendezVous>(entity =>
            {
                entity.Property(r => r.Statut).IsRequired();
            });

            // Configuration pour ApplicationUser
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(a => a.FullName).IsRequired();
                entity.Property(a => a.Role).IsRequired();
                entity.Property(a => a.Status).IsRequired();
                entity.Property(a => a.Avatar).HasDefaultValue("../images/default-avatar.png");
            });

            // Configuration pour NewPatient
            modelBuilder.Entity<NewPatient>(entity =>
            {
                entity.Property(n => n.FullName).IsRequired();
                entity.Property(n => n.User).IsRequired();
                entity.Property(n => n.Password).IsRequired();
                entity.Property(n => n.DateOfBirth).IsRequired();
                entity.Property(n => n.PhoneNumber).IsRequired();
            });

            // Configuration pour SignUp
            modelBuilder.Entity<SignUp>(entity =>
            {
                entity.HasKey(s => s.Id); // Ajout explicite de la clé primaire
                entity.Property(s => s.FullName).IsRequired();
                entity.Property(s => s.User).IsRequired();
                entity.Property(s => s.Password).IsRequired();
                entity.Property(s => s.ConfirmPassword).IsRequired();
            });
        }
    }
}
