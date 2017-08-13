using BLL.BLL_Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.ModelDTO;
using DAL.DAL_Core.Repositories;
using DAL.ModelBD;

namespace BLL.BLL_Core.Repositories
{
    public class TrackBll : ITrackBll
    {
        private DalFactory _dalFactory;

        public TrackBll(DalFactory dalFactory)
        {
            _dalFactory = dalFactory;
        }
        
    }
}
