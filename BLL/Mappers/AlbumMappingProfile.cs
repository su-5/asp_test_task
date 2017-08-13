using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.BLL_Core.ModelDTO;
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
        }
    }
}
