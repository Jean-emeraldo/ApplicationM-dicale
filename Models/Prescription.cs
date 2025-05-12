public class Prescription
{
    public int Id { get; set; }
    public string Medicament { get; set; }
    public string Posologie { get; set; }

    public int PatientId { get; set; }
    public Patient Patient { get; set; }
}
