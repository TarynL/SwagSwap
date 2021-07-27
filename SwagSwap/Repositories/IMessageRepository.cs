using SwagSwap.Models;
using System.Collections.Generic;

namespace SwagSwap.Repositories
{
    public interface IMessageRepository
    {
        public List<Message> GetAllMessagesByPostId(string firebaseUserId, int id);
        //public List<Message> GetAllMessagesByFirebaseUserId(string firebaseUserId);

        //public Message GetById(int id);

        public void Add(Message message);
    }
}