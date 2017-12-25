using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL.BLL_Core.Interfaces;
using BLL.Exception;
using BLL.Model.ModelDTO;

namespace Music_Directory.Controllers
{
    [RoutePrefix("api/ActivityCategory")]
    public class ActivityCategoryController : BaseApiController
    {
        private readonly IActivityCategoryBll _activityCategoryBll;

        public ActivityCategoryController(IBllFactory factoryBll)
        {
            if (factoryBll == null)
            {
                throw new ArgumentNullException(nameof(factoryBll));
            }

            _activityCategoryBll = factoryBll.ActivityCategoryBll;
        }


        /// <summary>
        /// добавление вида деятелености
        /// </summary>
        /// <returns></returns>
        [Route("AddActivityCategory")]
        [HttpPost]
        public IHttpActionResult AddActivityCategory(ActivityCategoryDto data)
        {
            try
            {
              var activityCategoryId = _activityCategoryBll.AddActivityCategory(data);

                return Ok(activityCategoryId);
            }
         
            catch (ErrorOwnException ex)
            {
                throw new ErrorOwnException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new ErrorOwnException("Ошибка при добавлении вида деятелености." + ex.Message);
            }
        }
    }
}
