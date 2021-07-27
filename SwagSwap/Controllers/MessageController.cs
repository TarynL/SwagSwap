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
        [HttpGet("{id}")]
        public IActionResult GetAll(int id)
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();

            return Ok(_messageRepository.GetAllMessages(currentUserProfileId, id));
        }
        
        //[HttpGet("myMessages/")]
        //public IActionResult GetMessagesByUserId()
        //{
        //    string currentUserProfileId = GetCurrentFirebaseUserProfileId();
        //    var messages = _messageRepository.GetAllMessagesByFirebaseUserId(currentUserProfileId);
        //    if (messages == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(messages);
        //}

        //// GET api/<MessageController>/5
        //[HttpGet("{id}")]
        //public IActionResult GetById(int id)
        //{
        //    var message = _messageRepository.GetById(id);
        //    if (message == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(message);
        //}

      
        [HttpPost]
        public IActionResult CreateMessage(Message message)
        {
            var currentUserProfile = GetCurrentUserProfile();
            message.SenderId = currentUserProfile.Id;
            message.CreateDateTime = DateTime.Now;

            _messageRepository.Add(message);
            return CreatedAtAction(nameof(GetAll), new { id = message.Id }, message);
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
