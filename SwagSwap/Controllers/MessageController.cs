using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwagSwap.Models;
using SwagSwap.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SwagSwap.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICategoryRepository _categoryRepository;

        public MessageController(
            IMessageRepository messageRepository,
            IPostRepository postRepository,
            IUserProfileRepository userProfileRepository,
            ICategoryRepository categoryRepository)
        {
            _messageRepository = messageRepository;
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
            _categoryRepository = categoryRepository;
        }

        // GET: api/<MessageController>
        [HttpGet("sent/{id}")]
        public IActionResult GetAll(int id)
        {
            var currentUserId = GetCurrentUserProfileId();

            return Ok(_messageRepository.GetAllSenderMessagesByPostId(currentUserId, id));
        }

        // GET: api/<MessageController>
        [HttpGet("received/{id}")]
        public IActionResult GetAllReceived(int id)
        {
            var currentUserId = GetCurrentUserProfileId();

            return Ok(_messageRepository.GetAllReceiverMessagesByPostId(currentUserId, id));
        }



        [HttpGet("PostId")]
        public IActionResult GetAllByPostId(int id)
        {
            var messages = _messageRepository.GetByPostId(id);
            if (messages == null)
            {
                return NotFound();
            }
            return Ok(messages);
        }


        [HttpPost]
        public IActionResult CreateMessage(Message message)
        {
            var currentUserProfile = GetCurrentUserProfile();
            message.SenderId = currentUserProfile.Id;
            message.CreateDateTime = DateTime.Now;

            _messageRepository.Add(message);
            return CreatedAtAction("GetByPostId", new { id = message.Id }, message);
        }
        private int GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return userProfile.Id;
        }
        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
