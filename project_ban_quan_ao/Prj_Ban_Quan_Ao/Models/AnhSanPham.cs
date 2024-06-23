using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class AnhSanPham
{
    public Guid Id { get; set; }

    public Guid? SanPhamId { get; set; }

    public string? DuongDan { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual SanPham? SanPham { get; set; }
}
