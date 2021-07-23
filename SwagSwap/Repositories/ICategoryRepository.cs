using SwagSwap.Models;
using System.Collections.Generic;

namespace SwagSwap.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetAllCategories();

        Category GetById(int id);

        void AddCategory(Category category);



    }
}
