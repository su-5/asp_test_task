using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Model.ModelDTO;
using BLL.Model.ModelRequest;
using DAL.ModelBD;

namespace BLL.BLL_Core.Interfaces
{
    public interface IAlbumBll
    {
        IList<AlbumDTO> GetAlbums();
        IList<TrackDTO> GetTracksFromAlbum(int id);
        IList<AddAlbumPL> AddNewAlbum(AddAlbumPL id);
    }
}
