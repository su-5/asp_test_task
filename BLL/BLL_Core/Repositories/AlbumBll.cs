using BLL.BLL_Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Model.ModelDTO;
using BLL.Model.ModelRequest;
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
            var result = Mapper.Map<List<Album>, IList<AlbumDTO>>(_dalFactory.Album.GetAll().ToList());
            return result;
        }

        public IList<TrackDTO> GetTracksFromAlbum(int id)
        {
            var result = Mapper.Map<IList<Track>, IList<TrackDTO>>(_dalFactory.Album.GetById(id).Tracks.ToList());
            return result;
        }

        public void AddNewAlbum(AddAlbumPL data)
        {
            Album newAlbum = new Album();
            DateTime dateValue = new DateTime(Convert.ToInt32(data.Album.Year), 01, 01);
            newAlbum.Year = dateValue;
            newAlbum.Name = data.Album.Name;
            foreach (var track in Mapper.Map<IList<TrackDTO>, IList<Track>>(data.TrackList))
                newAlbum.Tracks = new Collection<Track> { track }; ;
            _dalFactory.Album.Add(newAlbum);

        }
    }
}
