using System.ComponentModel.DataAnnotations;

namespace FamilyAlbum.Models;

public class Image
{
    public int Id {get; set;}
    public string? Title { get; set;}
    [DataType(DataType.Date)]
    public DateTime UploadedAt {get; set;} = DateTime.UtcNow;
    public string? Location {get; set;}

    public string Uploader {get; set;} = string.Empty;
    public int? Year { get; set;}
}