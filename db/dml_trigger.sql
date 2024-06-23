USE DbQuanAo;
GO
-- ================SanPham_DonHang => SanPham_KichCo================
CREATE OR ALTER TRIGGER trg_InsertSanPhamDonHang_SanPhamKichCo
ON SanPham_DonHang
AFTER INSERT
AS
BEGIN
    UPDATE SanPham_KichCo
    SET SanPham_KichCo.soLuong = SanPham_KichCo.soLuong - inserted.soLuong
    FROM inserted
	JOIN SanPham_KichCo ON SanPham_KichCo.kichCo = inserted.kichCo and inserted.SanPham_id = SanPham_KichCo.SanPham_id
END
go
CREATE OR ALTER TRIGGER trg_HuySanPhamDonHang_SanPhamKichCo
ON SanPham_DonHang
AFTER DELETE 
AS
BEGIN
	UPDATE SanPham_KichCo
    SET SanPham_KichCo.soLuong = SanPham_KichCo.soLuong + deleted.soLuong
	FROM deleted
	JOIN SanPham_KichCo ON SanPham_KichCo.kichCo = deleted.kichCo and deleted.SanPham_id = SanPham_KichCo.SanPham_id
END;
go
CREATE OR ALTER TRIGGER trg_UpdateSoLuongSanPhamSanPham_DonHang
ON SanPham_DonHang
AFTER UPDATE 
AS
BEGIN
	UPDATE SanPham_KichCo
    SET SanPham_KichCo.soLuong = SanPham_KichCo.soLuong - i.soLuong + d.soLuong
    FROM SanPham_KichCo
	JOIN inserted i ON i.SanPham_id = SanPham_KichCo.SanPham_id and i.kichCo = SanPham_KichCo.kichCo
	JOIN deleted d ON d.SanPham_id = SanPham_KichCo.SanPham_id and d.kichCo = SanPham_KichCo.kichCo
END;
GO
-- ================SanPham_GioHang================
CREATE OR ALTER TRIGGER trg_InsertGioHang
ON SanPham_GioHang
AFTER INSERT
AS
BEGIN
    UPDATE GioHang
    SET tongSoLuong = tongSoLuong + inserted.soLuong
    FROM GioHang join inserted on GioHang.id = inserted.GioHang_id
END
go
CREATE OR ALTER TRIGGER trg_HuyGioHang
ON SanPham_GioHang
AFTER DELETE 
AS
BEGIN
	UPDATE GioHang
    SET tongSoLuong = tongSoLuong - deleted.soLuong
    FROM GioHang join deleted on GioHang.id = deleted.GioHang_id
END;
go
CREATE OR ALTER TRIGGER trg_UpdateSoLuongSanPhamGioHang
ON SanPham_GioHang
AFTER UPDATE 
AS
BEGIN
	UPDATE GioHang
    SET GioHang.tongSoLuong = GioHang.tongSoLuong + i.soLuong - d.soLuong
    FROM GioHang
	JOIN inserted i ON GioHang.id = i.GioHang_id
	JOIN deleted d ON GioHang.id = d.GioHang_id;
END;
go
CREATE OR ALTER TRIGGER trg_magiamgia
ON Account_magiamgia
AFTER insert 
AS
BEGIN
	UPDATE MaGiamGia
    SET soLuong = soLuong - 1
    FROM MaGiamGia join inserted on MaGiamGia.id = inserted.Magiamgia_id
END;
GO
-- ================SanPham_KichCo=>SanPham================
CREATE OR ALTER TRIGGER trg_InsertSanPhamKichCo
ON SanPham_KichCo
AFTER INSERT
AS
BEGIN
    UPDATE SanPham
    SET SanPham.soLuong = SanPham.soLuong + inserted.soLuong
    FROM inserted
    JOIN SanPham ON SanPham.id = inserted.SanPham_id;
END;
go
CREATE OR ALTER TRIGGER trg_DeleteSanPhamKichCo
ON SanPham_KichCo
AFTER DELETE 
AS
BEGIN
	UPDATE SanPham
    SET SanPham.soLuong = SanPham.soLuong - deleted.soLuong
	FROM deleted
    JOIN SanPham ON SanPham.id = deleted.SanPham_id;
END;
go
CREATE OR ALTER TRIGGER trg_UpdateSanPhamKichCo
ON SanPham_KichCo
AFTER UPDATE
AS
BEGIN
	UPDATE SanPham
	SET SanPham.soLuong = SanPham.soLuong + i.soLuong - d.soLuong
	FROM SanPham
	JOIN inserted i ON SanPham.id = i.SanPham_id
	JOIN deleted d ON SanPham.id = d.SanPham_id;
END;

GO
-- ================SanPham<=DanhGia================
CREATE OR ALTER TRIGGER trg_InsertDanhGia
ON DanhGia
AFTER INSERT
AS
BEGIN
	DECLARE @count int = (select count(*) from DanhGia JOIN inserted on DanhGia.SanPham_id = inserted.SanPham_id);
    UPDATE SanPham
    SET danhGia = (SanPham.danhGia * (@count - 1) + inserted.vote) / @count
    FROM SanPham
	JOIN inserted on SanPham.id = inserted.SanPham_id
END
go
CREATE OR ALTER TRIGGER trg_DeleteDanhGia
ON DanhGia
AFTER DELETE 
AS
BEGIN
	DECLARE @count int = (select count(*) from DanhGia JOIN inserted on DanhGia.SanPham_id = inserted.SanPham_id);
	UPDATE SanPham
    SET danhGia = (SanPham.danhGia * (@count + 1) - deleted.vote) / @count
    FROM SanPham join deleted on SanPham.id = deleted.SanPham_id
END;
go
CREATE OR ALTER TRIGGER trg_UpdateDanhGia
ON DanhGia
AFTER UPDATE 
AS
BEGIN
	DECLARE @count int = (select count(*) from DanhGia JOIN inserted on DanhGia.SanPham_id = inserted.SanPham_id);
	UPDATE SanPham
    SET danhGia = SanPham.danhGia + (i.vote / @count) - (d.vote / @count)
    FROM SanPham
	JOIN inserted i ON SanPham.id = i.SanPham_id
	JOIN deleted d ON SanPham.id = d.SanPham_id;
END;
GO
-- ================Account=>GioHang================
CREATE OR ALTER TRIGGER trg_InsertAccount_GioHang
ON Account
AFTER INSERT
AS
BEGIN
	DECLARE @id uniqueidentifier = (SELECT id from inserted);
	INSERT INTO GioHang(id)
	VALUES(@id)
	END;
GO