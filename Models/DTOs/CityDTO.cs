namespace DogWalker.Models.DTOs;

public class CityDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<WalkerDTO> Walkers { get; set; }
}