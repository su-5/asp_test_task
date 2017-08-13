using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BLL_Core.Interfaces
{
    public interface IBllFactory
    {
        IAlbumBll AlbumBll { get; }
        ITrackBll TrackBll { get; }
    }
}
