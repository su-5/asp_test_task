using System;

namespace BLL.Model.ModelDTO
{
    public class TrackDTO : BasicDetails
    {
        public string Performer { get; set; }
        public TimeSpan Time { get; set; }
    }
}
