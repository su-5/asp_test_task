using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Model.ModelDTO;

namespace BLL.BLL_Core.Interfaces
{
    public interface ITrackBll
    {
        IList<TrackDTO> GetTracks();
    }
}
