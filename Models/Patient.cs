public class Patient
{
    public int Id { get; set; }
    public string Nom { get; set; }
    public string Prenom { get; set; }
    public DateTime DateNaissance { get; set; }
    public string Adresse { get; set; }
    public string Telephone { get; set; }

    public ICollection<Prescription> Prescriptions { get; set; }
    public ICollection<RendezVous> RendezVous { get; set; }
}
