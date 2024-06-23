using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class YeuThich
{
    public Guid Id { get; set; }

    public Guid? AccountId { get; set; }

    public Guid? SanPhamId { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual Account? Account { get; set; }

    public virtual SanPham? SanPham { get; set; }
}
