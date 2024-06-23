using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class BaiViet
{
    public Guid Id { get; set; }

    public string? NoiDung { get; set; }

    public DateTime? NgayTao { get; set; }
}
