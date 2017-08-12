using DAL.DAL_DB.Interfaces;
using DAL.GenericRepository;
using DAL.ModelBD;
using DAL.DAL_Core.Interfaces;

namespace DAL.DAL_DB.Repositories.AlbumDal
{
    public class TrackDal : GenericRepository<Track>, ITrackDal
    {
        public TrackDal(IDbFactory dbFactory)
            : base(dbFactory)
        {
        }
    }
}
