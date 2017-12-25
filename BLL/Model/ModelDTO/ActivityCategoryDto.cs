using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Model.ModelDTO
{
  public  class ActivityCategoryDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string FullName { get; set; }

        public override bool Equals(object obj)
        {
            return this.Equals(obj as ActivityCategoryDto);
        }
        public bool Equals(ActivityCategoryDto other)
        {
            if (other == null)
                return false;
            bool result = this.Code == (other.Code) && this.Name == (other.Name);

            return result;

        }

        // and this in your actual class
        public override int GetHashCode()
        {
            return $"{Code}_{Name}".GetHashCode();
        }
    }
}
