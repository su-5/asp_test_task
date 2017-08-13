using AutoMapper;
using BLL.BLL_Core.ModelDTO;
using BLL.ModelDTO;
using DAL.ModelBD;

namespace BLL.Mappers
{
    public class AlbumMappingProfile : Profile
    {
        public AlbumMappingProfile()
        {
            CreateMap<Album, AlbumDTO>()
                .ForMember(d => d.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(d => d.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(d => d.Year, opts => opts.MapFrom(src => src.Year));

            CreateMap<Track, TrackDTO>()
                .ForMember(d => d.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(d => d.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(d => d.Time, opts => opts.MapFrom(src => src.Time))
                .ForMember(d => d.Performer, opts => opts.MapFrom(src => src.Performer_));
        }
    }
}
