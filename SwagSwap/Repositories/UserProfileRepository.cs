using Microsoft.Extensions.Configuration;
using SwagSwap.Models;
using SwagSwap.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwagSwap.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, FirstName, LastName, DisplayName, 
                                ImageUrl, Email, UserZip, Rating                               
                          FROM UserProfile 
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserZip = DbUtils.GetInt(reader, "UserZip"),
                            Rating = DbUtils.GetInt(reader, "Rating"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl,
                                                                 Email, UserZip, Rating)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, @ImageUrl,
                                                @Email, @UserZip, @Rating)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserZip", userProfile.UserZip);
                    DbUtils.AddParameter(cmd, "@Rating", userProfile.Rating);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<UserProfile> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, FirebaseUserId, FirstName, LastName, DisplayName, 
                               Email, UserZip, Rating
                          FROM UserProfile 
                            ORDER BY DisplayName";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserZip = DbUtils.GetInt(reader, "UserZip"),
                            Rating = DbUtils.GetInt(reader, "Rating"),

                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public UserProfile GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, FirebaseUserId, FirstName, LastName, DisplayName, 
                               Email, UserZip, Rating
                          FROM UserProfile 
                          WHERE id = @id ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;

                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserZip = DbUtils.GetInt(reader, "UserZip"),
                            Rating = DbUtils.GetInt(reader, "Rating"),

                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }


    }
}

