using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class LoaiSanPham
{
    public Guid Id { get; set; }

    public string? TenLoai { get; set; }

    public string? MoTa { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}
