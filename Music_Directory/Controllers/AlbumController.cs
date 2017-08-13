using BLL.BLL_Core.Interfaces;
using BLL.Exception;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.BLL_Core.ModelDTO;

namespace Music_Directory.Controllers
{
    [RoutePrefix("api/album")]

    public class AlbumController : ApiController
    {
        private readonly IBllFactory _bllFactory;

        public AlbumController(IBllFactory bllFactory)
        {
            if (bllFactory == null)
            {
                throw new ArgumentNullException(nameof(bllFactory));
            }
            _bllFactory = bllFactory;
        }

        [HttpGet]
        [Route("GetAlbums")]
        public IList<AlbumDTO> GetAlbums()
        {
            try
            {
                var result = _bllFactory.AlbumBll.GetAlbums();
                return result;
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при получении стиска альбомов" + ex.Message);
            }
        }
    }
}
