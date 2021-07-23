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
    public class PostRepository: BaseRepository, IPostRepository
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
                              p.PostedDate,
                              p.CategoryId,  p.Size,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               u.UserTypeId, 
                              u.Rating, u.FirebaseUserId
                         FROM Post p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
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
                              p.PostedDate,
                              p.CategoryId,  p.Size,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               u.UserTypeId, 
                              u.Rating, u.FirebaseUserId
                         FROM Post p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                        WHERE FirebaseUserId = @FirebaseUserId 
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
                   SELECT   SELECT p.Id, p.UserId, p.Title, p.Description,  p.Value, 
                              p.ImageUrl AS PostImage,
                              p.PostedDate,
                              p.CategoryId,  p.Size,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.ImageUrl AS ProfileImage, u.Email, u.UserZip,                               u.UserTypeId, 
                              u.Rating, u.FirebaseUserId
                         FROM Post p
                              LEFT JOIN Categories c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                         WHERE p.id = @id";

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

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, UserId, Description, Value, ImageUrl, PostedDate, CategoryId, Size )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title,@UserId, @Description, @Value, @ImageUrl, @PostedDate, @CategoryId, @Size
                            )";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);
                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@Value", post.Value);
                    DbUtils.AddParameter(cmd, "@ImageUr;", post.ImageUrl);
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
                            DELETE Post                           
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


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
                    Id = DbUtils.GetInt(reader, "Id"),
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

        public void UpdatePost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post 
                            SET
                                
                                Title = @title,
                                Content = @content,
                                ImageLocation = @imageLocation,
                                PublishDateTime = @publishDateTime,
                                CategoryId = @categoryId
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
