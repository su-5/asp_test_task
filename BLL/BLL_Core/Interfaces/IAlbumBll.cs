using BLL.BLL_Core.ModelDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.ModelDTO;
using DAL.ModelBD;

namespace BLL.BLL_Core.Interfaces
{
    public interface IAlbumBll
    {
        IList<AlbumDTO> GetAlbums();
        IList<TrackDTO> GetTracksFromAlbum(int id);
    }
}
