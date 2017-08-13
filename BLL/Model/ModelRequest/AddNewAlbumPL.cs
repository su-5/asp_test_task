using System.Collections.Generic;
using BLL.Model.ModelDTO;

namespace BLL.Model.ModelRequest
{
    public class AddAlbumPL
    {
        public string Name { get; set; }
        public IList<TrackDTO> TrackList { get; set; }
    }
}