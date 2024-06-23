import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { LoaiSanPhamComponent } from './loai-san-pham/loai-san-pham.component';
import { BaiVietComponent } from './bai-viet/bai-viet.component';
import { DonHangComponent } from './don-hang/don-hang.component';
import { GopYComponent } from './gop-y/gop-y.component';
import { MaGiamGiaComponent } from './ma-giam-gia/ma-giam-gia.component';
import { TaiKhoanComponent } from './tai-khoan/tai-khoan.component';
import { AnhSanPhamComponent } from './anh-san-pham/anh-san-pham.component';
import { AddSanPhamComponent } from './san-pham/add-san-pham/add-san-pham.component';
import { AppComponent } from './app.component';
import { AddAnhSanPhamComponent } from './anh-san-pham/add-anh-san-pham/add-anh-san-pham.component';
import { AddLoaiSanPhamComponent } from './loai-san-pham/add-loai-san-pham/add-loai-san-pham.component';
import { AddBaiVietComponent } from './bai-viet/add-bai-viet/add-bai-viet.component';
import { EditSanPhamComponent } from './san-pham/edit-san-pham/edit-san-pham.component';
import { AddMaGiamGiaComponent } from './ma-giam-gia/add-ma-giam-gia/add-ma-giam-gia.component';
import { EditMaGiamGiaComponent } from './ma-giam-gia/edit-ma-giam-gia/edit-ma-giam-gia.component';
import { AddTaiKhoanComponent } from './tai-khoan/add-tai-khoan/add-tai-khoan.component';
import { EditTaiKhoanComponent } from './tai-khoan/edit-tai-khoan/edit-tai-khoan.component';
import { EditAnhSanPhamComponent } from './anh-san-pham/edit-anh-san-pham/edit-anh-san-pham.component';
import { EditLoaiSanPhamComponent } from './loai-san-pham/edit-loai-san-pham/edit-loai-san-pham.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'sanpham', component: SanPhamComponent, title: 'Sản phẩm' },
  {
    path: 'loaisanpham',
    component: LoaiSanPhamComponent,
    title: 'Loại sản phẩm',
  },
  { path: 'baiviet', component: BaiVietComponent, title: 'Bài viết' },
  { path: 'donhang', component: DonHangComponent, title: 'Đơn hàng' },
  { path: 'gopy', component: GopYComponent, title: 'Góp ý' },
  { path: 'magiamgia', component: MaGiamGiaComponent, title: 'Mã giảm giá' },
  { path: 'taikhoan', component: TaiKhoanComponent, title: 'Tài khoản' },
  { path: 'anhsanpham', component: AnhSanPhamComponent, title: 'Ảnh sản phẩm' },
  {
    path: 'themsanpham',
    component: AddSanPhamComponent,
    title: 'Thêm sản phẩm',
  },
  {
    path: 'themanhsanpham',
    component: AddAnhSanPhamComponent,
    title: 'Thêm ảnh sản phẩm',
  },
  {
    path: 'themloaisanpham',
    component: AddLoaiSanPhamComponent,
    title: 'Thêm loại sản phẩm',
  },
  {
    path: 'thembaiviet',
    component: AddBaiVietComponent,
    title: 'Thêm bài viết',
  },
  {
    path: 'themmagiamgia',
    component: AddMaGiamGiaComponent,
    title: 'Thêm mã giảm giá',
  },
  {
    path: 'suasanpham/:id',
    component: EditSanPhamComponent,
    title: 'Sửa bài viết',
  },
  {
    path: 'suamagiamgia/:id',
    component: EditMaGiamGiaComponent,
    title: 'Sửa mã giảm giá',
  },
  {
    path: 'themtaikhoan',
    component: AddTaiKhoanComponent,
    title: 'Thêm tài khoản',
  },
  {
    path: 'suataikhoan/:id',
    component: EditTaiKhoanComponent,
    title: 'Sửa tài khoản',
  },
  {
    path: 'suaanhsanpham/:id',
    component: EditAnhSanPhamComponent,
    title: 'Sửa ảnh sản phẩm',
  },
  {
    path: 'sualoaisanpham/:id',
    component: EditLoaiSanPhamComponent,
    title: 'Sửa loại sản phẩm',
  },
];
export default routes;
