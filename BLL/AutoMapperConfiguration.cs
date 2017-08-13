using AutoMapper;
using BLL.Mappers;

namespace BLL
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<AlbumMappingProfile>();
               // x.AddProfile<GoodMappingProfile>();
            });
        }
    }
}
