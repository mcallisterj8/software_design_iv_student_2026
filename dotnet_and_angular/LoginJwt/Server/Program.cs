using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Database
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseSqlite(connectionString);
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllers();

builder.Services.AddDefaultIdentity<IdentityUser>(options => {
    options.SignIn.RequireConfirmedAccount = false;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders(); // Adding token providers for the JWTs

// JWT settings from appsettings.json
string? jwtKey = builder.Configuration["Jwt:Key"];
string? jwtIssuer = builder.Configuration["Jwt:Issuer"];
string? jwtAudience = builder.Configuration["Jwt:Audience"];
string? jwtExpiresInMinutesRaw = builder.Configuration["Jwt:ExpiresInMinutes"];

// Validate required JWT config up front
if (string.IsNullOrWhiteSpace(jwtKey)) {
    throw new InvalidOperationException("Jwt:Key is not configured.");
}

if (string.IsNullOrWhiteSpace(jwtIssuer)) {
    throw new InvalidOperationException("Jwt:Issuer is not configured.");
}

if (string.IsNullOrWhiteSpace(jwtAudience)) {
    throw new InvalidOperationException("Jwt:Audience is not configured.");
}

if (!double.TryParse(jwtExpiresInMinutesRaw, out double jwtExpiresInMinutes)) {
    throw new InvalidOperationException("Jwt:ExpiresInMinutes is missing or invalid.");
}

/* 
    Use the JWT settings object we made. By adding it here
    in the service container, this allows the JwtSettings object
    to be used by the dependency injection system. Tells
    it to:
        - Create and manage a JwtSettings options object
        - Fill it with these values
        - Make it available for injection as IOptions<JwtSettings>
    
    So now, in the AuthController, we are able to dependency inject
    the JwtSettings object, and it will be filled with the values
    that we have set in the appsettings.json file. If we did not
    do the below code adding to the service container, then
    in the AuthController, we would just have to read from the 
    appsettings.json directly and get these values. That is
    not necessarily wrong, but it is more streamlined to just
    set the values here in the Program.cs and make available
    to the application more broadly.
*/
builder.Services.Configure<JwtSettings>(options => {
    options.Key = jwtKey;
    options.Issuer = jwtIssuer;
    options.Audience = jwtAudience;
    options.ExpiresInMinutes = jwtExpiresInMinutes;
});

// JWT authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

// Adds the Automapper.
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP pipeline
if (app.Environment.IsDevelopment()) {
    app.UseMigrationsEndPoint();
} else {
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

/*
    Must have this app.UseAuthentication(), and it must come *before* the authorization & controller calls below. 
    Remember that the file is executed top-down and we need the authentication turned on and running if we
    want the authorization features to work with the auth setup we have (JWTs in our case), and if we
    want the controller routes to be affected by what we setup in our auth setup (such as being able
    to use the [Authorize] attribute).
*/
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();