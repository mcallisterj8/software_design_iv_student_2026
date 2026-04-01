using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Database connection
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseSqlite(connectionString);
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => {
    options.SignIn.RequireConfirmedAccount = false;
})
.AddRoles<IdentityRole>() // This call to AddRoles() is not strictly for JWTs, but it is just telling Identity Framework to use role-based authorization. We don't need this in our example. In many setups, however, you will use this, so giving example here for it.
.AddEntityFrameworkStores<ApplicationDbContext>() // This tells dotnet to use the ApplicationDbContext (the database) for storing Identity data.
.AddDefaultTokenProviders(); // Adding token providers for the JWTs

/*
    In a default dotnet project created with Identity, this will be
    AddControllersWithViews() instead of the AddControllers() call
    seen below. Keeping AddControllersWithViews() is fine and will not
    interfere with anything. The AddControllersWithViews() tells dotnet
    that it will use the Razor pages for the frontend. Since we are just
    using dotnet as a backend API, all we need is the controller
    feature, not the fronted Razor pages.
*/
builder.Services.AddControllers();

// Retrieve JWT settings from appsettings.json
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
/*
    Determines which route is attempted to be reached.
*/
app.UseRouting();

/*
    UseAuthentication() determines which user is attempting to access a route.

    Must have this app.UseAuthentication(), and it must come *before* the authorization & controller calls below. 
    Remember that the file is executed top-down and we need the authentication turned on and running if we
    want the authorization features to work with the auth setup we have (JWTs in our case), and if we
    want the controller routes to be affected by what we setup in our auth setup (such as being able
    to use the [Authorize] attribute).
*/
app.UseAuthentication();
/*
    UseAuthorization() makes the determination, now that we know WHO is trying
    to access a given route, if that user is ALLOWED to access the given route.
*/
app.UseAuthorization();

/*
    MapControllers() makes the controller actions (endpoints) available as destinations.
*/
app.MapControllers();

app.Run();