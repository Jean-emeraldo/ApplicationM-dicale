public class Medecin
{
    public int Id { get; set; }
    public string Nom { get; set; }
    public string Specialite { get; set; }

    public ICollection<RendezVous> RendezVous { get; set; }
}
