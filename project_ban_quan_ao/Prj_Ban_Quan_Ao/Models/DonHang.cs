using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class DonHang
{
    public Guid Id { get; set; }

    public Guid? AccountId { get; set; }

    public Guid? MaGiamGiaId { get; set; }

    public double? ThanhTien { get; set; }

    public string? DiaChi { get; set; }

    public string? GhiChu { get; set; }

    public string? PhuongThucVanChuyen { get; set; }

    public string? PhuongThucThanhToan { get; set; }

    /// <summary>
    /// Chờ xác nhận đơn hàng, Đang chuẩn bị hàng, Đang giao hàng, Giao hàng thành công, Đã hủy
    /// </summary>
    public string? TrangThai { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayHuy { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<SanPhamDonHang> SanPhamDonHangs { get; set; } = new List<SanPhamDonHang>();
}
