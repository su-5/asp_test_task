using DAL.DAL_DB.Interfaces;

namespace DAL.DAL_Core.Interfaces
{
    interface IDalFactory
    {
        IAlbumDal Album { get; }
        ITrackDal Track { get; }
    }
}
