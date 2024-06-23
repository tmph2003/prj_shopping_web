import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { CartComponent } from './cart/cart.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { ContactComponent } from './contact/contact.component';
import { ThongtintaikhoanComponent } from './thongtintaikhoan/thongtintaikhoan.component';
import { DonhangComponent } from './donhang/donhang.component';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { BolocComponent } from './boloc/boloc.component';
import { MagiamgiaComponent } from './magiamgia/magiamgia.component';
import { BaivietComponent } from './baiviet/baiviet.component';
import { AuthGuard } from './AuthGard';
import { AuthGuardLoginPage } from './AuthGardLoginPage';
import { ChitietsanphamComponent } from './chitietsanpham/chitietsanpham.component';
import { ChatBoxUserComponent } from './chat-box-user/chat-box-user.component';
import { ChatBoxAdminListUserComponent } from './chat-box-admin-list-user/chat-box-admin-list-user.component';
import { ChatBoxAdminComponent } from './chat-box-admin/chat-box-admin.component';
import { YeuthichComponent } from './yeuthich/yeuthich.component';
import { TimkiemComponent } from './timkiem/timkiem.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title:'Trang chủ' },
  { path: 'pages', component: PagesComponent, title:'Page'},
  { path: 'login', component: DangnhapComponent, title:'Đăng nhập', canActivate: [AuthGuardLoginPage]},
  { path: 'dangky', component: DangkyComponent, title:'Đăng ký', canActivate: [AuthGuardLoginPage]},
  { path: 'giohang', component: CartComponent, title:'Giỏ hàng', canActivate: [AuthGuard] },
  { path: 'thanhtoan', component: ThanhtoanComponent, title:'Thanh toán', canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, title:'Liên hệ'},
  { path: 'taikhoan', component: ThongtintaikhoanComponent, title: 'Thông tin tài khoản', canActivate: [AuthGuard] },
  { path: 'donhang', component: DonhangComponent, title: 'Đơn hàng', canActivate: [AuthGuard] },
  { path: 'chitietdonhang/:id', component: ChitietdonhangComponent, title: 'Chi tiết đơn hàng', canActivate: [AuthGuard] },
  { path: 'shop/:id', component: BolocComponent, title: 'Shop'},
  { path: 'TimKiemSanPham/:searchKey', component: TimkiemComponent, title: 'Shop'},
  { path: 'discount', component: MagiamgiaComponent, title: 'Mã giảm giá'},
  { path: 'ContactToAdmin', component: ChatBoxUserComponent, title: 'Liên hệ với người bán'},
  { path: 'supportuser', component: ChatBoxAdminListUserComponent, title: 'Hỗ trợ người dùng'},
  { path: 'yeuthich', component: YeuthichComponent, title: 'Sản phẩm yêu thích', canActivate: [AuthGuard]},
  { path: 'chatboxadmin/:id', component: ChatBoxAdminComponent, title: 'Chat box'},
  { path: 'baiviet/:id', component: BaivietComponent, title: 'Bài viết'},
  { path: 'chitietsanpham/:id', component: ChitietsanphamComponent, title: 'Chi tiết sản phẩm'},
  { path: '', component: HomeComponent, title: 'Trang chủ'},
];

export default routes;
