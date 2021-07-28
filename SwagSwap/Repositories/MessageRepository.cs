using Microsoft.Extensions.Configuration;
using SwagSwap.Models;
using SwagSwap.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwagSwap.Repositories
{

    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Message> GetAllSenderMessagesByPostId(int currentUserId, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               SELECT m.Id as MessageId, m.SenderId, m.RecipientId, m.PostId, m.Content, m.CreateDateTime, 
                                   u.Id as ProfileId, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.ImageUrl as ProfileImage, u.Email, 
                                   u.UserZip, u.Rating,
                                   p.Id as PostId, p.UserId, p.Title, p.Description, p.Value, p.ImageUrl as PostImage, p.PostedDate, p.Size, p.CategoryId
                                   
                            FROM Messages m
                            LEFT JOIN Posts p ON m.PostId = p.id
                            LEFT JOIN UserProfile u ON m.RecipientId = u.Id 
                            WHERE m.PostId = @id and m.SenderId = @currentUserId
                            ORDER BY m.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@currentUserId", currentUserId);
                    DbUtils.AddParameter(cmd, "@id", id);


                    var reader = cmd.ExecuteReader();

                    var messages = new List<Message>();
                    while (reader.Read())
                    {
                        messages.Add(new Message()
                        {
                            Id = DbUtils.GetInt(reader, "MessageId"),
                            SenderId = DbUtils.GetInt(reader, "SenderId"),
                            RecipientId = DbUtils.GetInt(reader, "RecipientId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "ProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserZip = DbUtils.GetInt(reader, "UserZip"),
                                Rating = DbUtils.GetInt(reader, "Rating")
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Value = DbUtils.GetInt(reader, "Value"),
                                ImageUrl = DbUtils.GetString(reader, "PostImage"),
                                PostedDate = DbUtils.GetDateTime(reader, "PostedDate"),
                                Size = DbUtils.GetString(reader, "Size"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                              
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserZip = DbUtils.GetInt(reader, "UserZip"),
                                    Rating = DbUtils.GetInt(reader, "Rating")
                                }
                            }
                        });

                    }
                    reader.Close();
                    return messages;
                }
            }
        }

        public List<Message> GetAllReceiverMessagesByPostId(int currentUserId, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               SELECT m.Id as MessageId, m.SenderId, m.RecipientId, m.PostId, m.Content, m.CreateDateTime, 
                                   u.Id as ProfileId, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.ImageUrl as ProfileImage, u.Email, 
                                   u.UserZip, u.Rating,
                                   p.Id as PostId, p.UserId, p.Title, p.Description, p.Value, p.ImageUrl as PostImage, p.PostedDate, p.Size, p.CategoryId
                                   
                            FROM Messages m
                            LEFT JOIN Posts p ON m.PostId = p.id
                            LEFT JOIN UserProfile u ON m.SenderId = u.Id 
                            WHERE m.PostId = @id AND m.RecipientId = @currentUserId
                            ORDER BY m.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@currentUserId", currentUserId);
                    DbUtils.AddParameter(cmd, "@id", id);


                    var reader = cmd.ExecuteReader();

                    var messages = new List<Message>();
                    while (reader.Read())
                    {
                        messages.Add(new Message()
                        {
                            Id = DbUtils.GetInt(reader, "MessageId"),
                            SenderId = DbUtils.GetInt(reader, "SenderId"),
                            RecipientId = DbUtils.GetInt(reader, "RecipientId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "ProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserZip = DbUtils.GetInt(reader, "UserZip"),
                                Rating = DbUtils.GetInt(reader, "Rating")
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Value = DbUtils.GetInt(reader, "Value"),
                                ImageUrl = DbUtils.GetString(reader, "PostImage"),
                                PostedDate = DbUtils.GetDateTime(reader, "PostedDate"),
                                Size = DbUtils.GetString(reader, "Size"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),

                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "ProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserZip = DbUtils.GetInt(reader, "UserZip"),
                                    Rating = DbUtils.GetInt(reader, "Rating")
                                }
                            }
                        });

                    }
                    reader.Close();
                    return messages;
                }
            }
        }

        


        //public Message GetById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                         SELECT m.Id as MessageId, m.SenderId, m.RecipientId, m.PostId, m.Content, m.CreateDateTime, 
        //                           u.Id as ProfileId, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.ImageUrl as ProfileImage, u.Email, 
        //                           u.UserZip, u.Rating,
        //                           p.Id as PostId, p.UserId p.Title, p.Description, p.Value, p.ImageUrl as PostImage, p.PostedDate, p.Size, p.CategoryId,
        //                           c.Id as CatId, c.Name as CategoryName
        //                    FROM Messages m
        //                    LEFT JOIN UserProfile u ON m.SenderId = u.Id
        //                    LEFT JOIN Posts p ON m.PostId = p.id
        //                    LEFT JOIN Categories c ON p.CategoryId = c.id
        //                    WHERE m.Id = @id
        //                    ORDER BY m.CreateDateTime DESC
        //                     ";

        //            DbUtils.AddParameter(cmd, "@id", id);

        //            var reader = cmd.ExecuteReader();

        //            Message message = null;
        //            if (reader.Read())
        //            {
        //                message = new Message()
        //                {
        //                    Id = DbUtils.GetInt(reader, "MessageId"),
        //                    SenderId = DbUtils.GetInt(reader, "SenderId"),
        //                    RecipientId = DbUtils.GetInt(reader, "RecipientId"),
        //                    PostId = DbUtils.GetInt(reader, "PostId"),
        //                    Content = DbUtils.GetString(reader, "Content"),
        //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
        //                    UserProfile = new UserProfile()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "ProfileId"),
        //                        FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                        FirstName = DbUtils.GetString(reader, "FirstName"),
        //                        LastName = DbUtils.GetString(reader, "LastName"),
        //                        DisplayName = DbUtils.GetString(reader, "DisplayName"),
        //                        ImageUrl = DbUtils.GetString(reader, "ProfileImage"),
        //                        Email = DbUtils.GetString(reader, "Email"),
        //                        UserZip = DbUtils.GetInt(reader, "UserZip"),
        //                        Rating = DbUtils.GetInt(reader, "Rating")
        //                    },
        //                    Post = new Post()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "PostId"),
        //                        UserId = DbUtils.GetInt(reader, "UserId"),
        //                        Title = DbUtils.GetString(reader, "Title"),
        //                        Description = DbUtils.GetString(reader, "Description"),
        //                        Value = DbUtils.GetInt(reader, "Value"),
        //                        ImageUrl = DbUtils.GetString(reader, "PostImage"),
        //                        PostedDate = DbUtils.GetDateTime(reader, "PostedDate"),
        //                        Size = DbUtils.GetString(reader, "Size"),
        //                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
        //                        Category = new Category()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "CatId"),
        //                            Name = DbUtils.GetString(reader, "CategoryName")
        //                        }
        //                    }
        //                };
        //            }


        //            reader.Close();

        //            return message;
        //        }
        //    }
        //}
        public void Add(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Messages (
                            RecipientId, Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @RecipientId, @Content, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "@RecipientId", message.RecipientId);
                    DbUtils.AddParameter(cmd, "@Content", message.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", message.CreateDateTime);


                    message.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}


