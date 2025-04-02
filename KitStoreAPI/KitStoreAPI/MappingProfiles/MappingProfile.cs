using AutoMapper;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;

namespace KitStoreAPI.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<CreateCartItemDTO, CartItem>().ReverseMap();
            CreateMap<CartItemDTO, CartItem>().ReverseMap();
            CreateMap<KitDTO, Kit>().ReverseMap();
            CreateMap<CreateKitDTO, Kit>().ReverseMap();
            CreateMap<UpdateCartItemDTO, CartItem>()
            .ForMember(dest => dest.Id, opt => opt.Ignore()); // Prevents overwriting ID
        }
    }
}
