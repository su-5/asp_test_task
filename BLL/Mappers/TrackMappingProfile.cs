using AutoMapper;
using BLL.Model.ModelDTO;
using DAL.ModelBD;

namespace BLL.Mappers
{
  public  class TrackMappingProfile : Profile
    {
        public TrackMappingProfile()
        {
            CreateMap<Track, TrackDTO>()
                .ForMember(d => d.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(d => d.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(d => d.Time, opts => opts.MapFrom(src => src.Time))
                .ForMember(d => d.Performer, opts => opts.MapFrom(src => src.Performer_));

            CreateMap<TrackDTO, Track>()
                .ForMember(d => d.Id, opts => opts.MapFrom(src => src.Id))
                .ForMember(d => d.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(d => d.Time, opts => opts.MapFrom(src => src.Time))
                .ForMember(d => d.Performer_, opts => opts.MapFrom(src => src.Performer));
        }
    }
}
