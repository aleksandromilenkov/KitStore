using AutoMapper;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;

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
            CreateMap<Order, OrderDTO>()
           .ForMember(dest => dest.Total, opt =>
               opt.MapFrom(src => src.Subtotal + src.DeliveryFee - src.Discount));

            CreateMap<OrderItem, OrderItemDTO>();
        }
    }
}
