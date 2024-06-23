using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class Account
{
    public Guid Id { get; set; }

    public string? TenDangNhap { get; set; }

    public string? TenHienThi { get; set; }

    public string? MatKhau { get; set; }

    public bool? VaiTro { get; set; }

    public bool? GioiTinh { get; set; }

    public DateOnly? NgaySinh { get; set; }

    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public string? DuongDanAnh { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual ICollection<AccountMaGiamGium> AccountMaGiamGia { get; set; } = new List<AccountMaGiamGium>();

    public virtual ICollection<DanhGium> DanhGia { get; set; } = new List<DanhGium>();

    public virtual ICollection<DiaChi> DiaChis { get; set; } = new List<DiaChi>();

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual GioHang? GioHang { get; set; }

    public virtual ICollection<YeuThich> YeuThiches { get; set; } = new List<YeuThich>();
}
