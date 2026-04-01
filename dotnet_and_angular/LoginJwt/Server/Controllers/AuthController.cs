using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using System.Text.Encodings.Web;
using AutoMapper;
using Microsoft.Extensions.Options;
using Server.Models;
using Server.Models.Dtos;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {

    private readonly ApplicationDbContext _context;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly UrlEncoder _urlEncoder;
    private readonly IConfiguration _config;
    private readonly JwtSettings _jwtSettings;
    private readonly IMapper _mapper;

    /*
        This JWT setup relies on the frontend for logout by deleting the JWT. However,
        in a more thorough setup, the backend would also play a role. Even if the frontend
        removes the token, that token could still be used elsewhere until it expires if it
        had been copied or stolen. Because of that, stronger setups usually include some
        form of backend-controlled revocation or renewal control.

        A common approach is to use refresh tokens. In that setup, the access token is
        short-lived, and a longer-lived refresh token is issued and tracked by the server.
        When the user logs out, the server can revoke the refresh token. That means even
        if the current access token remains valid for a short time, the client will no
        longer be able to obtain new access tokens once the current one expires.
    */

    public AuthController(
        ApplicationDbContext context,
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        UrlEncoder urlEncoder,
        IConfiguration config,
        IOptions<JwtSettings> jwtSettings,
        IMapper mapper
    ) {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
        _urlEncoder = urlEncoder;
        _config = config;
        _jwtSettings = jwtSettings.Value;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterWithEmail(EmailLoginDetails details) {
        AuthResult authResult = await RegisterWithEmail(Request, details);

        if (authResult.HasErrors) {
            return BadRequest(authResult.Errors);
        }

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> LoginWithEmail(EmailLoginDetails details) {
        var user = await _userManager.FindByEmailAsync(details.Email);

        if (null == user) {
            return Unauthorized("Wrong email or password.");
        }

        var result = await _signInManager.PasswordSignInAsync(details.Email, details.Password, details.RememberMe, false).ConfigureAwait(false);

        if (result.Succeeded) {

            // Generate a JWT for the authenticated user
            var token = this.GenerateJwtToken(user);

            // User Automapper to quickly map the IdentityUser onto the UserDto.
            UserDto userDto = _mapper.Map<UserDto>(user);

            return Ok(new { success = true, user = userDto, emailConfirmed = true, requires2fa = false, accessToken = token });
        }
        if (result.RequiresTwoFactor) {
            return Ok(new { success = true, emailConfirmed = true, requires2fa = true });
        }
        if (result.IsLockedOut) {
            return Ok(new { success = false, isLockedOut = true });
        }

        return Unauthorized();
    }

    [HttpPost("sign-in-with-token")]
    public async Task<IActionResult> SignInWithToken() {
        // Extract the token from the Authorization header
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token == null) {
            return Unauthorized(new { message = "Token is missing" });
        }

        // Validate the token here (this is a simplified approach)
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            // IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)),
            ValidateIssuer = true,
            // ValidIssuer = _config["Jwt:Issuer"],
            ValidIssuer = _jwtSettings.Issuer,
            ValidateAudience = true,
            // ValidAudience = _config["Jwt:Audience"],
            ValidAudience = _jwtSettings.Audience,
            ValidateLifetime = true, // Ensure the token hasn't expired
            ClockSkew = TimeSpan.Zero // Optional: reduce or remove clock skew allowance
        };

        try {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (null == user) {
                return Unauthorized(new { message = "Invalid token" });
            }

            var newToken = GenerateJwtToken(user);

            UserDto userDto = _mapper.Map<UserDto>(user);

            return Ok(new { message = "Token is valid", user = userDto, accessToken = newToken });
        } catch {
            return Unauthorized(new { message = "Invalid token" });
        }
    }

    /******************************************************************
    The below private methods would be more appropriate to be in an
    AuthService. But to simplify this project setup, I just have
    these methods here in the controller. Really, the controller
    should only have methods directy related to handling requests,
    and more intricate details should be delegated to a service.
    ******************************************************************/
    private string GenerateJwtToken(IdentityUser user) {
        if (null == user) {
            throw new ArgumentNullException(nameof(user));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var now = DateTime.UtcNow;
        var clockSkewMinutes = 5;
        var expires = now.AddMinutes(_jwtSettings.ExpiresInMinutes);
        var notBefore = now.AddMinutes(-clockSkewMinutes); // Subtracting for clock skew

        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
        }),
            Expires = expires,
            SigningCredentials = creds,
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    private async Task<AuthResult> RegisterWithEmail(HttpRequest request, EmailLoginDetails details) {
        AuthResult? authResult = new AuthResult();
        IdentityUser? user = new IdentityUser { UserName = details.Email, Email = details.Email };
        IdentityResult? result = await _userManager.CreateAsync(user, details.Password);

        if (!result.Succeeded) {
            authResult.Errors = result.Errors.Select(identityError => identityError.Description).ToList();

            return authResult;
        }

        authResult.Success = true;
        return authResult;
    }


}
