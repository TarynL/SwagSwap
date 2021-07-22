using SwagSwap.Models;
using System.Collections.Generic;

namespace SwagSwap.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllUsers();

        UserProfile GetUserById(int id);
        void Add(UserProfile userProfile);


    }
}