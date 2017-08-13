using BLL.BLL_Core.Interfaces;
using BLL.Exception;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.Model.ModelRequest;

namespace Music_Directory.Controllers
{
    [RoutePrefix("api/album")]

    public class AlbumController : BaseApiController
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
        public IHttpActionResult GetAlbums()
        {
            try
            {
                var result = _bllFactory.AlbumBll.GetAlbums();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при получении стиска альбомов" + ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTracksFromAlbum")]
        public IHttpActionResult GetTracksFromAlbum([FromUri] int id)
        {
            try
            {
                var result = _bllFactory.AlbumBll.GetTracksFromAlbum(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при получении стиска треков" + ex.Message);
            }
        }

        [HttpPost]
        [Route("AddNewAlbum")]
        public IHttpActionResult AddNewAlbum([FromBody] AddAlbumPL newAlbum)
        {
            try
            {
                _bllFactory.AlbumBll.AddNewAlbum(newAlbum);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при добавлении альбома" + ex.Message);
            }
        }
    }
}
