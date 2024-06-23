using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class SanPhamKichCo
{
    public Guid Id { get; set; }

    public Guid? SanPhamId { get; set; }

    public double? KichCo { get; set; }

    public int? SoLuong { get; set; }

    public DateTime? NgayTao { get; set; }

    public int? Mau { get; set; }

    public virtual SanPham? SanPham { get; set; }
}
