using DAL.DAL_Core.Interfaces;
using DAL.DAL_DB.Interfaces;
using DAL.DAL_DB.Repositories.AlbumDal;
using DAL.ModelBD;

namespace DAL.DAL_Core.Repositories
{
    public class DalFactory : IDalFactory
    {
        private IAlbumDal _album;
        private ITrackDal _track;
        private MusicDBEntities _dbContext;
        private readonly IDbFactory _dbFactory;
        public DalFactory(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }
        public MusicDBEntities DbContext => _dbContext ?? (_dbContext = _dbFactory.Init());
        public IAlbumDal Album => _album ?? (_album = new AlbumDal(_dbFactory));
        public ITrackDal Track => _track ?? (_track = new TrackDal(_dbFactory));
    }
}
