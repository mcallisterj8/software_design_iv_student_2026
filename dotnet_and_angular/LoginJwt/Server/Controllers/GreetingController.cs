using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GreetingController : ControllerBase {

        [HttpGet("one")]
        public async Task<IActionResult> GreetingOne() {
            return Ok(new Greeting { Message = "Gretting One!" });
        }

        [HttpGet("two")]
        public async Task<IActionResult> GreetingTwo() {
            return Ok(new Greeting { Message = "Greeting Two!" });
        }

        [HttpGet("three")]
        public async Task<IActionResult> GreetingThree() {
            return Ok(new Greeting { Message = "Greeting Three!" });
        }

    }
}
