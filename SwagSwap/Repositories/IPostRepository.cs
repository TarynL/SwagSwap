using SwagSwap.Models;
using System.Collections.Generic;

namespace SwagSwap.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);

        void UpdatePost(Post post);
        List<Post> GetAllPostsNotFromUser(int currentUserId);

        List<Post> GetAllPosts();
        Post GetPostById(int id);

        List<Post> GetAllPostsFromUser(string firebaseUserId);

        List<Post> GetAllPostsByUserId(int id);
        public List<Post> GetAllPostsByCategory(int id);
    }
}