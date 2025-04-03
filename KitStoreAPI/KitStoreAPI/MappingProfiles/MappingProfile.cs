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
            CreateMap<ClubDTO, Club>().ReverseMap();
            CreateMap<CreateClubDTO, Club>().ReverseMap();
            CreateMap<UpdateCartItemDTO, CartItem>().ReverseMap()
            .ForMember(dest => dest.Id, opt => opt.Ignore()); // Prevents overwriting ID
            CreateMap<UpdateClubDTO, Club>().ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}
