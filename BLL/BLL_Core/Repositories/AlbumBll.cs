using BLL.BLL_Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.BLL_Core.ModelDTO;
using BLL.ModelDTO;
using DAL.DAL_Core.Repositories;
using DAL.ModelBD;

namespace BLL.BLL_Core.Repositories
{
    public class AlbumBll : IAlbumBll
    {
        private readonly DalFactory _dalFactory;
        public AlbumBll(DalFactory dalFactory)
        {
            _dalFactory = dalFactory;
        }
        public IList<AlbumDTO> GetAlbums()
        {
            var result =  Mapper.Map<List<Album>, IList<AlbumDTO>>(_dalFactory.Album.GetAll().ToList());
            return result;
        }

        public IList<TrackDTO> GetTracksFromAlbum(int id)
        {
            var result = Mapper.Map<IList<Track>, IList<TrackDTO>>(_dalFactory.Album.GetById(id).Tracks.ToList());
            return result;
        }
    }
}
