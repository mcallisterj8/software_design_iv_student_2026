namespace Server.Models;

public class JwtSettings {
    public required string Key { get; set; }
    public required string Issuer { get; set; }
    public required string Audience { get; set; }
    public double ExpiresInMinutes { get; set; }
}

public class EmailLoginDetails {
    public required string Email { get; set; }
    public required string Password { get; set; }
    public bool RememberMe { get; set; }
}

public class AuthResult {
    public bool Success { get; set; } = false;
    public bool HasErrors => this.Errors != null;
    public ICollection<string>? Errors { get; set; } = null;
}