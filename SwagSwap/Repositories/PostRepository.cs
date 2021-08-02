using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SwagSwap.Models;
using SwagSwap.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwagSwap.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.IsDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id
                            WHERE p.IsDeleted = 0
                         ORDER BY p.PostedDate DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));

                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsNotFromUser(int currentUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.IsDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id
                         WHERE p.UserId != @currentUserId AND p.isDeleted = 0
                         ORDER BY p.PostedDate DESC";
                    DbUtils.AddParameter(cmd, "@currentUserId", currentUserId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));

                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsFromUser(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.IsDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id
                        WHERE FirebaseUserId = @FirebaseUserId AND p.isDeleted = 0
                    ORDER BY p.PostedDate DESC";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.IsDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id
                         WHERE p.id = @id AND p.isDeleted = 0";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public List<Post> GetAllPostsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.IsDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id

                         WHERE p.Userid = @id AND p.isDeleted = 0";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));

                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Posts (
                            Title, UserId, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title,@UserId, @Description, @Value, @ImageUrl, @PostedDate, @CategoryId, @Size, 0
                            )";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);
                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@Value", post.Value);
                    DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
                    DbUtils.AddParameter(cmd, "@PostedDate", post.PostedDate);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@Size", post.Size);


                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Posts
                            SET IsDeleted = 1
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdatePost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Posts 
                            SET
                                
                                Title = @title,
                                Description = @description,
                                ImageUrl = @imageUrl,
                                Value = @value,
                                CategoryId = @categoryId,
                                Size = @Size
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@description", post.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
                    DbUtils.AddParameter(cmd, "@value", post.Value);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@size", post.Size);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Description = DbUtils.GetString(reader, "Description"),
                Value = DbUtils.GetInt(reader, "Value"),
                ImageUrl = DbUtils.GetString(reader, "PostImage"),
                PostedDate = DbUtils.GetDateTime(reader, "PostedDate"),
                Size = DbUtils.GetString(reader, "Size"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                UserId = DbUtils.GetInt(reader, "UserId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
                    Email = DbUtils.GetString(reader, "Email"),
                    UserZip = DbUtils.GetInt(reader, "UserZip"),
                    Rating = DbUtils.GetInt(reader, "Rating"),

                }
            };
        }

        public List<Post> GetAllPostsByCategory(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate, p.isDeleted,
                              p.CategoryId,  p.Size, c.Id as CategoryId,
                              c.[Name] AS CategoryName, u.Id as UserProfileId, u.FirebaseUserId,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               
                              u.Rating
                         FROM Posts p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserId = u.id
                         WHERE p.CategoryId = @id and p.isDeleted = 0
                         ORDER BY p.PostedDate DESC";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));

                    }

                    reader.Close();

                    return posts;
                }
            }
        }


       
    }



}

