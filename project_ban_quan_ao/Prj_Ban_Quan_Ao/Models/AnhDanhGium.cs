using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class AnhDanhGium
{
    public Guid Id { get; set; }

    public Guid? DanhGiaId { get; set; }

    public string? DuongDan { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual DanhGium? DanhGia { get; set; }
}
