# AGENTS.md - Family Album Application

This document provides guidelines for agentic coding assistants working on the Family Album ASP.NET Core MVC application.

## Project Overview

The Family Album is a .NET 10.0 ASP.NET Core MVC web application for managing family photo albums. It includes:
- Image upload and display functionality
- User album organization
- API endpoints for image operations
- PostgreSQL database with Entity Framework Core

## Build, Lint, and Test Commands

### Build Commands
```bash
# Build the application
dotnet build

# Build for production
dotnet build --configuration Release

# Clean and rebuild
dotnet clean && dotnet build
```

### Run Commands
```bash
# Run the application in development mode
dotnet run

# Run with specific configuration
dotnet run --configuration Release

# Run with environment variables
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

### Database Commands
```bash
# Create new migration (after model changes)
dotnet ef migrations add <MigrationName>

# Apply migrations to database
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove
```

### Test Commands
Currently, there are no unit tests configured in this project. To add testing:

1. Create a test project:
```bash
dotnet new xunit -n FamilyAlbum.Tests
dotnet add FamilyAlbum.Tests reference FamilyAlbum.csproj
```

2. Run tests (once implemented):
```bash
dotnet test
dotnet test --filter "Category=Unit"
dotnet test --logger "console;verbosity=detailed"
```

### Lint and Code Quality
```bash
# Run dotnet format (built-in code formatter)
dotnet format

# Check code style without fixing
dotnet format --verify-no-changes

# Analyze code quality (requires dotnet-analyzers)
dotnet build /p:RunAnalyzersDuringBuild=true
```

## Code Style Guidelines

### C# Coding Standards

#### Naming Conventions
- **Classes**: PascalCase (e.g., `ImageController`, `AppDBContext`)
- **Methods**: PascalCase (e.g., `UploadImage`, `GetImages`)
- **Properties**: PascalCase (e.g., `Id`, `Title`, `UploadedAt`)
- **Private fields**: camelCase with underscore prefix (e.g., `_dbContext`)
- **Local variables**: camelCase (e.g., `filePath`, `imageList`)
- **Constants**: PascalCase (e.g., `MaxFileSize`)

#### File Organization
- Controllers in `Controllers/` directory
- Models in `Models/` directory
- Views in `Views/{ControllerName}/` directory
- Database context in `Data/` directory
- Static files in `wwwroot/` directory

#### Class Structure
```csharp
namespace FamilyAlbum.Controllers;

public class ImageController : Controller
{
    private readonly AppDBContext _dbContext;

    public ImageController(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Methods follow this order: public, private, protected
    // Within each group: constructors, properties, methods
}
```

### ASP.NET Core Patterns

#### Controller Guidelines
- Use async/await for I/O operations
- API controllers inherit from `ControllerBase`
- MVC controllers inherit from `Controller`
- Use attribute routing for clarity
- Return appropriate HTTP status codes

```csharp
[ApiController]
[Route("api/images")]
public class ImageApiController : ControllerBase
{
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        // Implementation
    }
}
```

#### Model Validation
- Use DataAnnotations for validation
- Enable nullable reference types
- Use appropriate data types

```csharp
public class Image
{
    public int Id { get; set; }
    public string? Title { get; set; }
    [Required]
    [DataType(DataType.Date)]
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    public string Uploader { get; set; } = string.Empty;
}
```

### Database Conventions

#### Entity Framework Configuration
- Use lowercase table and column names
- Configure relationships explicitly when needed
- Use async methods for database operations

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    foreach (var entity in modelBuilder.Model.GetEntityTypes())
    {
        entity.SetTableName(entity.GetTableName().ToLower());
        foreach (var property in entity.GetProperties())
        {
            property.SetColumnName(property.GetColumnName().ToLower());
        }
    }
}
```

### Error Handling

#### Controller Error Handling
- Use try-catch blocks for database operations
- Return appropriate HTTP status codes
- Log exceptions appropriately

```csharp
[HttpGet]
public async Task<IActionResult> Index()
{
    try
    {
        var images = await _dbContext.Images.ToListAsync();
        return View(images);
    }
    catch (Exception ex)
    {
        // Log exception
        return BadRequest("An error occurred while retrieving images");
    }
}
```

#### API Error Responses
- Use consistent error response format
- Provide meaningful error messages

```csharp
return BadRequest(new { error = "Invalid file format" });
```

### Razor View Guidelines

#### View Structure
- Use `_ViewImports.cshtml` for common imports
- Follow consistent indentation
- Use meaningful variable names

```razor
@using FamilyAlbum.Models
@model List<Image>

@{
    ViewData["Title"] = "Images";
}

<div class="image-gallery">
    @foreach (var image in Model)
    {
        <img src="@Url.Content($"/images/{image.Id}.jpg")" alt="@image.Title" />
    }
</div>
```

#### JavaScript Integration
- Keep JavaScript in separate files when possible
- Use semantic class and ID names
- Follow modern JavaScript practices

### Security Best Practices

#### File Upload Security
- Validate file types and sizes
- Store uploaded files outside web root
- Use secure file paths

```csharp
if (file == null || file.Length == 0 || file.Length > MaxFileSize)
{
    return BadRequest("Invalid file");
}

var allowedExtensions = new[] { ".jpg", ".png", ".gif" };
var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
if (!allowedExtensions.Contains(extension))
{
    return BadRequest("File type not allowed");
}
```

#### Authentication and Authorization
- Use ASP.NET Core Identity for user management
- Implement proper authorization policies
- Never store sensitive data in plain text

### Code Quality Standards

#### Imports
- Use `using` statements at the top of files
- Remove unused imports
- Follow alphabetical order when possible

```csharp
using FamilyAlbum.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
```

#### Comments
- Use English comments (despite Swedish UI text)
- Comment complex business logic
- Keep comments up-to-date

#### Code Formatting
- Use 4 spaces for indentation
- Maximum line length: 120 characters
- Consistent brace placement

### Testing Guidelines

#### Unit Test Structure (When Implemented)
- Test project naming: `{ProjectName}.Tests`
- Test class naming: `{ClassName}Tests`
- Test method naming: `MethodName_Scenario_ExpectedResult`

```csharp
public class ImageControllerTests
{
    [Fact]
    public async Task Upload_ValidFile_ReturnsSuccess()
    {
        // Arrange
        // Act
        // Assert
    }
}
```

### Development Workflow

#### Git Workflow
- Use feature branches for new work
- Write meaningful commit messages in English
- Follow conventional commit format when possible

#### Code Review Standards
- Ensure code compiles without warnings
- Verify proper error handling
- Check for security vulnerabilities
- Maintain code style consistency

### Configuration

#### Environment-Specific Settings
- Use `appsettings.json` for configuration
- Override with environment variables when needed
- Never commit secrets to repository

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=familyalbum;Username=user;Password=password"
  },
  "AllowedHosts": "*"
}
```

### Performance Considerations

#### Database Queries
- Use async methods for I/O operations
- Include only necessary data with `Select()`
- Use pagination for large datasets

```csharp
var images = await _dbContext.Images
    .Where(i => i.Uploader == userId)
    .OrderByDescending(i => i.UploadedAt)
    .Take(20)
    .ToListAsync();
```

#### File Handling
- Dispose of streams properly
- Use `using` statements for file operations
- Implement proper cleanup for temporary files

This document should be updated as the codebase evolves and new patterns emerge.</content>
<filePath>AGENTS.md