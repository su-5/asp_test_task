using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.BLL_Core.ModelDTO;

namespace BLL.ModelDTO
{
    public class TrackDTO : BasicDetails
    {
        public string Performer { get; set; }
        public TimeSpan Time { get; set; }
    }
}
