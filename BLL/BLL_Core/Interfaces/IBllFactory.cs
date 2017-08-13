namespace BLL.BLL_Core.Interfaces
{
    public interface IBllFactory
    {
        IAlbumBll AlbumBll { get; }
        ITrackBll TrackBll { get; }
    }
}
