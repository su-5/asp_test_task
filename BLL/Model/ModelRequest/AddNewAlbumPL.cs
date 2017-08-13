using System.Collections.Generic;
using BLL.Model.ModelDTO;

namespace BLL.Model.ModelRequest
{
    public class AddAlbumPL
    {
        public IList<TrackDTO> TrackList { get; set; }
        public AlbumDTO Album { get; set; }
    }
}