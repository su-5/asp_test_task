using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.BLL_Core.Interfaces;
using BLL.Exception;

namespace Music_Directory.Controllers
{
    [RoutePrefix("api/track")]
    public class TrackController : BaseApiController
    {
        private readonly IBllFactory _bllFactory;

        public TrackController(IBllFactory bllFactory)
        {
            if (bllFactory == null)
            {
                throw new ArgumentNullException(nameof(bllFactory));
            }
            _bllFactory = bllFactory;
        }

        [HttpGet]
        [Route("GetTracks")]
        public IHttpActionResult GetTracks()
        {
            try
            {
                var result = _bllFactory.TrackBll.GetTracks();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при получении треков" + ex.Message);
            }
        }

    }
}
