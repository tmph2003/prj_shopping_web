using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class GopY
{
    public Guid Id { get; set; }

    public string? HoTen { get; set; }

    public string? Email { get; set; }

    public string? SoDienThoai { get; set; }

    public string? NoiDung { get; set; }

    public DateTime? NgayTao { get; set; }
}
