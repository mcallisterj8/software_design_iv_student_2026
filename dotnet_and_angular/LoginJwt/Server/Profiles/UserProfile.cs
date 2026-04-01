using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Server.Models.Dtos;

namespace Server.Profiles.UserProfiles;

public class UserProfile : Profile {
    public UserProfile() {
        CreateMap<IdentityUser, UserDto>().ReverseMap();
    }
}

