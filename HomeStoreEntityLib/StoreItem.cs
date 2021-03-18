using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeStoreEntityLib
{
    public class StoreItem
    {
        [Key]
        [Required]
        [Column(TypeName = "TEXT")]
        public Guid Id { get; set; }
        [Required]
        public string Item { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        [Column(TypeName = "NUMERIC")]
        public string Price { get; set; }
        public string Image { get; set; }
        [Column(TypeName = "TEXT")]
        public DateTime? LastPurchased { get; set; }
        [Column(TypeName = "TEXT")]
        public DateTime? ExpDate { get; set; }
        public int AvgDaysInHome { get; set; }
        [Column(TypeName = "INTEGER")]
        public bool RunningLow { get; set; }
        public int CartQty { get; set; }
        public int QtyLastPurchased { get; set; }
        public string Details { get; set; }
    }
}
