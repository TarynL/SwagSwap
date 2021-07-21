using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SwagSwap.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }


        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageUrl { get; set; }

        public int UserZip { get; set; }
        public int Rating { get; set; }



        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    
}
}
