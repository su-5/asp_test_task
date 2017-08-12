using DAL.DAL_Core.Interfaces;
using DAL.DAL_DB.Interfaces;
using DAL.GenericRepository;
using DAL.ModelBD;

namespace DAL.DAL_DB.Repositories.AlbumDal
{
    public class AlbumDal : GenericRepository<Album>, IAlbumDal
    {
        public AlbumDal(IDbFactory dbFactory)
             : base(dbFactory)
        {
        }
    }
}
