public class RendezVous
{
    public int Id { get; set; }
    public DateTime DateRendezVous { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; }

    public int MedecinId { get; set; }
    public Medecin Medecin { get; set; }

    public string Statut { get; set; }
}

