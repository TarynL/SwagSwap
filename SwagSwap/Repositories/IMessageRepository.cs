using SwagSwap.Models;
using System.Collections.Generic;

namespace SwagSwap.Repositories
{
    public interface IMessageRepository
    {
        public List<Message> GetAllSenderMessagesByPostId(int currentUserId, int id);
        public List<Message> GetAllReceiverMessagesByPostId(int currentUserId, int id);
      
        public void Add(Message message);
    }
}