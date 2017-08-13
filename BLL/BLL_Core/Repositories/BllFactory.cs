using BLL.BLL_Core.Interfaces;
using DAL.DAL_Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLL_Core.Repositories
{
    public class BllFactory : IBllFactory
    {
        private readonly DalFactory _dalFactory;
        private IAlbumBll _album;
        private ITrackBll _track;

        public BllFactory()
        {
            _dalFactory = new DalFactory(new DbFactory());
        }

        public IAlbumBll AlbumBll => _album ?? (_album = new AlbumBll(_dalFactory));

        public ITrackBll TrackBll => _track ?? (_track = new TrackBll(_dalFactory));
    }
}
