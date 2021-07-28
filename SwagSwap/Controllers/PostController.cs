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
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // GET api/<PostController>/5
        [HttpGet("myPosts/")]
        public IActionResult GetPostsByUserId()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var posts = _postRepository.GetAllPostsFromUser(currentUserProfileId);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

       
        [HttpPost]
        public IActionResult CreatePost(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.UserId = currentUserProfile.Id;
            post.PostedDate = DateTime.Now;

            _postRepository.Add(post);
            return CreatedAtAction(nameof(GetAll), new { id = post.Id }, post);
        }

        //// PUT Update api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {

            //post.PostedDate = DateTime.Now;
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.UpdatePost(post);
            return NoContent();
        }

        //DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
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


