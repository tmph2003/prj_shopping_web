using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class DanhGium
{
    public Guid Id { get; set; }

    public string? NoiDung { get; set; }

    public Guid? SanPhamId { get; set; }

    public Guid? AccountId { get; set; }

    public Guid? DonHangId { get; set; }

    public double? Vote { get; set; }

    public DateTime? NgayTao { get; set; }

    public double? KichCo { get; set; }

    /// <summary>
    /// 1.đỏ, 2. cam, 3. vàng, 4. xanh lục, 5. xanh dương, 6. tím, 7.đen, 8. trắng
    /// </summary>
    public int? Mau { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<AnhDanhGium> AnhDanhGia { get; set; } = new List<AnhDanhGium>();

    public virtual SanPham? SanPham { get; set; }
}
