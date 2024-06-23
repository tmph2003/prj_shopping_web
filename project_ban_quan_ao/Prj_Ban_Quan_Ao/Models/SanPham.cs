using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class SanPham
{
    public Guid Id { get; set; }

    public Guid? LoaiSanPhamId { get; set; }

    public string MaSanPham { get; set; } = null!;

    public string? Ten { get; set; }

    public double? Gia { get; set; }

    public int? SoLuong { get; set; }

    public string? MoTa { get; set; }

    /// <summary>
    /// đánh giá trung bình, không cho sửa
    /// </summary>
    public double? DanhGia { get; set; }

    public string? GhiChu { get; set; }

    public double? GiaSauGiam { get; set; }

    public string? ChatLieu { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? DuongDanAnh { get; set; }

    public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; } = new List<AnhSanPham>();

    public virtual ICollection<DanhGium> DanhGiaNavigation { get; set; } = new List<DanhGium>();

    public virtual LoaiSanPham? LoaiSanPham { get; set; }

    public virtual ICollection<SanPhamDonHang> SanPhamDonHangs { get; set; } = new List<SanPhamDonHang>();

    public virtual ICollection<SanPhamGioHang> SanPhamGioHangs { get; set; } = new List<SanPhamGioHang>();

    public virtual ICollection<SanPhamKichCo> SanPhamKichCos { get; set; } = new List<SanPhamKichCo>();

    public virtual ICollection<YeuThich> YeuThiches { get; set; } = new List<YeuThich>();
}
