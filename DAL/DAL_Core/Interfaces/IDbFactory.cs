using DAL.ModelBD;

namespace DAL.DAL_Core.Interfaces
{
    public interface IDbFactory
    {
        MusicDBEntities Init();
    }
}
