using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.BLL_Core.Interfaces;
using BLL.Model.ModelDTO;
using DAL.DAL_Core.Repositories;

namespace BLL.BLL_Core.Repositories
{
    public class ActivityCategoryBll : IActivityCategoryBll
    {
        private readonly DalFactory _dalFactory;
        public ActivityCategoryBll(DalFactory dalFactory)
        {
            _dalFactory = dalFactory;
        }

        public int AddActivityCategory(ActivityCategoryDto data)
        {
            //int code = Convert.ToInt32(_dalFactory.ActivityCategoryDal.GetAll().Max(m => m.CODE_UK_1)) + 1;// получаем максимальный CODE_UK + 1 .
            //if (code <= 9)
            //{
            //    data.Code = "0" + code;
            //}
            //else
            //{
            //    data.Code = code.ToString();
            //}
            //var result = Mapper.Map<ActivityCategoryDto, RAI_C_ACTIVITY_CATEGORY>(data);
            //result.RAI_ACTIVITY_CATEGORY_ID = null;
            //_dalFactory.ActivityCategoryDal.Add(result);
            return 4;
        }
    }
}
