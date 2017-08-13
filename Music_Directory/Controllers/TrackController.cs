using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.BLL_Core.Interfaces;
using BLL.BLL_Core.ModelDTO;
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

       

    }
}
