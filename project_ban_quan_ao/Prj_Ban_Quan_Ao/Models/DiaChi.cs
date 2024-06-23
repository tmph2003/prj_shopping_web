using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class DiaChi
{
    public Guid Id { get; set; }

    public Guid? AccountId { get; set; }

    public string? Xa { get; set; }

    public string? Huyen { get; set; }

    public string? Tinh { get; set; }

    public string? GhiChu { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual Account? Account { get; set; }
}
