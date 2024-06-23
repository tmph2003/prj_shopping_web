using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class GioHang
{
    public Guid Id { get; set; }

    public int? TongSoLuong { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual Account IdNavigation { get; set; } = null!;

    public virtual ICollection<SanPhamGioHang> SanPhamGioHangs { get; set; } = new List<SanPhamGioHang>();
}
