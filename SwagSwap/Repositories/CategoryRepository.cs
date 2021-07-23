using Microsoft.Extensions.Configuration;
using SwagSwap.Models;
using SwagSwap.Repositories;
using SwagSwap.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwagSwap.Repositories

{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name
                            FROM Categories
                            ORDER BY Name";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name
                          FROM Categories
                          WHERE Id = @Id 
                          ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Category category = null;
                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }


                    reader.Close();

                    return category;
                }
            }
        }

        public void AddCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Categories  (Name)
                        OUTPUT INSERTED.ID
                        VALUES ( @name)";
                    DbUtils.AddParameter(cmd, "@name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //public void Update(Category category)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                UPDATE Category
        //                   SET name = @name
        //                 WHERE Id = @Id";

        //            DbUtils.AddParameter(cmd, "@name", category.Name);
        //            DbUtils.AddParameter(cmd, "@Id", category.Id);

        //            cmd.ExecuteNonQuery();
        //        }
        //        conn.Close();
        //    }
        //}

        //public void Delete(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = "UPDATE Category SET IsDeleted = 1 WHERE Id = @Id";
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
    }
}