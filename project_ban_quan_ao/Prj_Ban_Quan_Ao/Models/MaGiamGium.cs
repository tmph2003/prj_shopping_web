using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class MaGiamGium
{
    public Guid Id { get; set; }

    public int? SoLuong { get; set; }

    public string? Ma { get; set; }

    /// <summary>
    /// theo phần trăm
    /// </summary>
    public double? LuongGiam { get; set; }

    public DateOnly? NgayHetHan { get; set; }

    public DateTime? NgayTao { get; set; }

    public string? MoTa { get; set; }

    public virtual ICollection<AccountMaGiamGium> AccountMaGiamGia { get; set; } = new List<AccountMaGiamGium>();
}
