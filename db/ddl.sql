CREATE DATABASE [DbQuanAo]
GO
USE [DbQuanAo]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[id] [uniqueidentifier] NOT NULL,
	[tenDangNhap] [nvarchar](255) NULL,
	[tenHienThi] [nvarchar](255) NULL,
	[matKhau] [nvarchar](255) NULL,
	[vaiTro] [bit] NULL,
	[gioiTinh] [bit] NULL,
	[ngaySinh] [date] NULL,
	[soDienThoai] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[duongDanAnh] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
 CONSTRAINT [PK__Account__3213E83F29E21319] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Account_MaGiamGia]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account_MaGiamGia](
	[id] [uniqueidentifier] NOT NULL,
	[Account_id] [uniqueidentifier] NULL,
	[Magiamgia_id] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnhDanhGia]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnhDanhGia](
	[id] [uniqueidentifier] NOT NULL,
	[DanhGia_id] [uniqueidentifier] NULL,
	[duongDan] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
 CONSTRAINT [PK__AnhDanhG__3213E83F0936EDFE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AnhSanPham]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnhSanPham](
	[id] [uniqueidentifier] NOT NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[duongDan] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
 CONSTRAINT [PK__AnhSanPh__3213E83F3AC1BB1B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BaiViet]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaiViet](
	[id] [uniqueidentifier] NOT NULL,
	[noiDung] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatBox]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatBox](
	[id] [uniqueidentifier] NOT NULL,
	[Admin_id] [uniqueidentifier] NULL,
	[Account_id] [uniqueidentifier] NULL,
	[noiDung] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
	[nguoiGui_id] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhGia]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhGia](
	[id] [uniqueidentifier] NOT NULL,
	[noiDung] [nvarchar](max) NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[Account_id] [uniqueidentifier] NULL,
	[DonHang_id] [uniqueidentifier] NULL,
	[vote] [float] NULL,
	[ngayTao] [datetime] NULL,
	[kichCo] [float] NULL,
	[mau] [int] NULL,
 CONSTRAINT [PK__DanhGia__3213E83F6069BE80] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiaChi]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaChi](
	[id] [uniqueidentifier] NOT NULL,
	[Account_id] [uniqueidentifier] NULL,
	[xa] [nvarchar](255) NULL,
	[huyen] [nvarchar](255) NULL,
	[tinh] [nvarchar](255) NULL,
	[ghiChu] [nvarchar](255) NULL,
	[ngayTao] [datetime] NULL,
 CONSTRAINT [PK__DiaChi__3213E83FFCBD13B5] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonHang]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonHang](
	[id] [uniqueidentifier] NOT NULL,
	[Account_id] [uniqueidentifier] NULL,
	[MaGiamGia_id] [uniqueidentifier] NULL,
	[thanhTien] [float] NULL,
	[diaChi] [nvarchar](max) NULL,
	[ghiChu] [nvarchar](max) NULL,
	[phuongThucVanChuyen] [nvarchar](max) NULL,
	[phuongThucThanhToan] [nvarchar](max) NULL,
	[trangThai] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
	[ngayHuy] [datetime] NULL,
 CONSTRAINT [PK__DonHang__3213E83F9B700232] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHang]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHang](
	[id] [uniqueidentifier] NOT NULL,
	[tongSoLuong] [int] NULL,
	[ngayTao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GopY]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GopY](
	[id] [uniqueidentifier] NOT NULL,
	[hoTen] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[soDienThoai] [nvarchar](255) NULL,
	[noiDung] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoaiSanPham]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiSanPham](
	[id] [uniqueidentifier] NOT NULL,
	[tenLoai] [nvarchar](255) NULL,
	[moTa] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
 CONSTRAINT [PK__LoaiSanP__3213E83FE10F5703] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaGiamGia]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaGiamGia](
	[id] [uniqueidentifier] NOT NULL,
	[soLuong] [int] NULL,
	[Ma] [nvarchar](255) NULL,
	[luongGiam] [float] NULL,
	[ngayHetHan] [date] NULL,
	[ngayTao] [datetime] NULL,
	[moTa] [nvarchar](max) NULL,
 CONSTRAINT [PK__MaGiamGi__3213E83FD86A52CC] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[id] [uniqueidentifier] NOT NULL,
	[LoaiSanPham_id] [uniqueidentifier] NULL,
	[maSanPham] [nvarchar](255) NOT NULL,
	[ten] [nvarchar](max) NULL,
	[gia] [float] NULL,
	[soLuong] [int] NULL,
	[moTa] [nvarchar](max) NULL,
	[danhGia] [float] NULL,
	[ghiChu] [nvarchar](max) NULL,
	[giaSauGiam] [float] NULL,
	[chatLieu] [nvarchar](255) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[duongDanAnh] [nvarchar](max) NULL,
 CONSTRAINT [PK__SanPham__3213E83F1C164B26] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__SanPham__5B439C42849C83D7] UNIQUE NONCLUSTERED 
(
	[maSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham_DonHang]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham_DonHang](
	[id] [uniqueidentifier] NOT NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[DonHang_id] [uniqueidentifier] NULL,
	[soLuong] [int] NOT NULL,
	[ngayTao] [datetime] NULL,
	[kichCo] [float] NULL,
	[mau] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [uq_sanpham_donhang] UNIQUE NONCLUSTERED 
(
	[SanPham_id] ASC,
	[DonHang_id] ASC,
	[kichCo] ASC,
	[mau] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham_GioHang]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham_GioHang](
	[id] [uniqueidentifier] NOT NULL,
	[GioHang_id] [uniqueidentifier] NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[soLuong] [int] NULL,
	[ngayTao] [datetime] NULL,
	[kichCo] [float] NULL,
	[mau] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham_KichCo]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham_KichCo](
	[id] [uniqueidentifier] NOT NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[kichCo] [float] NULL,
	[soLuong] [int] NULL,
	[ngayTao] [datetime] NULL,
	[mau] [int] NULL,
 CONSTRAINT [PK__SanPham___3213E83F67FADB66] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_SanphamKichco] UNIQUE NONCLUSTERED 
(
	[SanPham_id] ASC,
	[kichCo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [uq_sanpham_kichCo] UNIQUE NONCLUSTERED 
(
	[SanPham_id] ASC,
	[kichCo] ASC,
	[mau] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[YeuThich]    Script Date: 22/06/2024 10:20:17 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[YeuThich](
	[id] [uniqueidentifier] NOT NULL,
	[Account_id] [uniqueidentifier] NULL,
	[SanPham_id] [uniqueidentifier] NULL,
	[ngayTao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_accountId_sanphamid] UNIQUE NONCLUSTERED 
(
	[Account_id] ASC,
	[SanPham_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF__Account__id__4AB81AF0]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_vaiTro]  DEFAULT ((0)) FOR [vaiTro]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF__Account__ngayTao__4BAC3F29]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[Account_MaGiamGia] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[AnhDanhGia] ADD  CONSTRAINT [DF__AnhDanhGia__id__52593CB8]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[AnhDanhGia] ADD  CONSTRAINT [DF__AnhDanhGi__ngayT__534D60F1]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[AnhSanPham] ADD  CONSTRAINT [DF__AnhSanPham__id__2E1BDC42]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[AnhSanPham] ADD  CONSTRAINT [DF__AnhSanPha__ngayT__2F10007B]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[BaiViet] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[BaiViet] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[ChatBox] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ChatBox] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[DanhGia] ADD  CONSTRAINT [DF__DanhGia__id__4E88ABD4]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[DanhGia] ADD  CONSTRAINT [DF__DanhGia__ngayTao__4F7CD00D]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[DiaChi] ADD  CONSTRAINT [DF__DiaChi__id__5CD6CB2B]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  CONSTRAINT [DF__DiaChi__ngayTao__5DCAEF64]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [DF__DonHang__id__4222D4EF]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [DF__DonHang__ngayTao__440B1D61]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[GioHang] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[GioHang] ADD  DEFAULT ((0)) FOR [tongSoLuong]
GO
ALTER TABLE [dbo].[GioHang] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[GopY] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[GopY] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[LoaiSanPham] ADD  CONSTRAINT [DF__LoaiSanPham__id__2A4B4B5E]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[LoaiSanPham] ADD  CONSTRAINT [DF__LoaiSanPh__ngayT__2B3F6F97]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[MaGiamGia] ADD  CONSTRAINT [DF__MaGiamGia__id__59063A47]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[MaGiamGia] ADD  CONSTRAINT [DF__MaGiamGia__ngayT__59FA5E80]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[SanPham] ADD  CONSTRAINT [DF__SanPham__id__25869641]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[SanPham] ADD  CONSTRAINT [DF_SanPham_danhGia]  DEFAULT ((0)) FOR [danhGia]
GO
ALTER TABLE [dbo].[SanPham] ADD  CONSTRAINT [DF__SanPham__ngayTao__267ABA7A]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[SanPham] ADD  CONSTRAINT [DF__SanPham__ngayCap__276EDEB3]  DEFAULT (getdate()) FOR [ngayCapNhat]
GO
ALTER TABLE [dbo].[SanPham_DonHang] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[SanPham_DonHang] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[SanPham_GioHang] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[SanPham_GioHang] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[SanPham_KichCo] ADD  CONSTRAINT [DF__SanPham_Kich__id__31EC6D26]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[SanPham_KichCo] ADD  CONSTRAINT [DF__SanPham_K__ngayT__32E0915F]  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[YeuThich] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[YeuThich] ADD  DEFAULT (getdate()) FOR [ngayTao]
GO
ALTER TABLE [dbo].[Account_MaGiamGia]  WITH CHECK ADD  CONSTRAINT [fk_Account_MaGiamGia_Account_id] FOREIGN KEY([Magiamgia_id])
REFERENCES [dbo].[MaGiamGia] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Account_MaGiamGia] CHECK CONSTRAINT [fk_Account_MaGiamGia_Account_id]
GO
ALTER TABLE [dbo].[Account_MaGiamGia]  WITH CHECK ADD  CONSTRAINT [fk_Account_MaGiamGia_MaGiamGia_id] FOREIGN KEY([Account_id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Account_MaGiamGia] CHECK CONSTRAINT [fk_Account_MaGiamGia_MaGiamGia_id]
GO
ALTER TABLE [dbo].[AnhDanhGia]  WITH CHECK ADD  CONSTRAINT [fk_AnhDanhGia_DanhGia_id] FOREIGN KEY([DanhGia_id])
REFERENCES [dbo].[DanhGia] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnhDanhGia] CHECK CONSTRAINT [fk_AnhDanhGia_DanhGia_id]
GO
ALTER TABLE [dbo].[AnhSanPham]  WITH CHECK ADD  CONSTRAINT [fk_AnhSanPham_SanPham_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
GO
ALTER TABLE [dbo].[AnhSanPham] CHECK CONSTRAINT [fk_AnhSanPham_SanPham_id]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [fk_DanhGia_Account_id] FOREIGN KEY([Account_id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [fk_DanhGia_Account_id]
GO
ALTER TABLE [dbo].[DanhGia]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_DanhGia_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DanhGia] CHECK CONSTRAINT [fk_SanPham_DanhGia_id]
GO
ALTER TABLE [dbo].[DiaChi]  WITH CHECK ADD  CONSTRAINT [fk_DiaChi_Account_id] FOREIGN KEY([Account_id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DiaChi] CHECK CONSTRAINT [fk_DiaChi_Account_id]
GO
ALTER TABLE [dbo].[DonHang]  WITH CHECK ADD  CONSTRAINT [fk_DonHang_Account_id] FOREIGN KEY([Account_id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DonHang] CHECK CONSTRAINT [fk_DonHang_Account_id]
GO
ALTER TABLE [dbo].[GioHang]  WITH CHECK ADD  CONSTRAINT [fk_GioHang_id] FOREIGN KEY([id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GioHang] CHECK CONSTRAINT [fk_GioHang_id]
GO
ALTER TABLE [dbo].[SanPham]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_LoaiSanPham_id] FOREIGN KEY([LoaiSanPham_id])
REFERENCES [dbo].[LoaiSanPham] ([id])
GO
ALTER TABLE [dbo].[SanPham] CHECK CONSTRAINT [fk_SanPham_LoaiSanPham_id]
GO
ALTER TABLE [dbo].[SanPham_DonHang]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_DonHang_DonHang_id] FOREIGN KEY([DonHang_id])
REFERENCES [dbo].[DonHang] ([id])
GO
ALTER TABLE [dbo].[SanPham_DonHang] CHECK CONSTRAINT [fk_SanPham_DonHang_DonHang_id]
GO
ALTER TABLE [dbo].[SanPham_DonHang]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_DonHang_SanPham_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SanPham_DonHang] CHECK CONSTRAINT [fk_SanPham_DonHang_SanPham_id]
GO
ALTER TABLE [dbo].[SanPham_GioHang]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_GioHang_GioHang_id] FOREIGN KEY([GioHang_id])
REFERENCES [dbo].[GioHang] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SanPham_GioHang] CHECK CONSTRAINT [fk_SanPham_GioHang_GioHang_id]
GO
ALTER TABLE [dbo].[SanPham_GioHang]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_GioHang_SanPham_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SanPham_GioHang] CHECK CONSTRAINT [fk_SanPham_GioHang_SanPham_id]
GO
ALTER TABLE [dbo].[SanPham_KichCo]  WITH CHECK ADD  CONSTRAINT [fk_SanPham_KichCo_SanPham_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
GO
ALTER TABLE [dbo].[SanPham_KichCo] CHECK CONSTRAINT [fk_SanPham_KichCo_SanPham_id]
GO
ALTER TABLE [dbo].[YeuThich]  WITH CHECK ADD  CONSTRAINT [fk_YeuThich_Account_id] FOREIGN KEY([Account_id])
REFERENCES [dbo].[Account] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[YeuThich] CHECK CONSTRAINT [fk_YeuThich_Account_id]
GO
ALTER TABLE [dbo].[YeuThich]  WITH CHECK ADD  CONSTRAINT [fk_YeuThich_SanPham_id] FOREIGN KEY([SanPham_id])
REFERENCES [dbo].[SanPham] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[YeuThich] CHECK CONSTRAINT [fk_YeuThich_SanPham_id]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1.??, 2. cam, 3. vàng, 4. xanh l?c, 5. xanh d??ng, 6. tím, 7.?en, 8. tr?ng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DanhGia', @level2type=N'COLUMN',@level2name=N'mau'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ch? xác nh?n ??n hàng, ?ang chu?n b? hàng, ?ang giao hàng, Giao hàng thành công, ?ã h?y' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DonHang', @level2type=N'COLUMN',@level2name=N'trangThai'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'theo ph?n tr?m' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MaGiamGia', @level2type=N'COLUMN',@level2name=N'luongGiam'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?ánh giá trung bình, không cho s?a' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SanPham', @level2type=N'COLUMN',@level2name=N'danhGia'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1.??, 2. cam, 3. vàng, 4. xanh l?c, 5. xanh d??ng, 6. tím, 7.?en, 8. tr?ng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SanPham_DonHang', @level2type=N'COLUMN',@level2name=N'mau'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1.??, 2. cam, 3. vàng, 4. xanh l?c, 5. xanh d??ng, 6. tím, 7.?en, 8. tr?ng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SanPham_GioHang', @level2type=N'COLUMN',@level2name=N'mau'
GO
