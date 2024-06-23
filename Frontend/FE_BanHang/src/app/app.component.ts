import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { ThongtintaikhoanComponent } from './thongtintaikhoan/thongtintaikhoan.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PagesComponent } from './pages/pages.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { CartComponent } from './cart/cart.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { DonhangComponent } from './donhang/donhang.component';
import { BolocComponent } from './boloc/boloc.component';
import { MagiamgiaComponent } from './magiamgia/magiamgia.component';
import { BaivietComponent } from './baiviet/baiviet.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterOutlet,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    DangnhapComponent,
    DangkyComponent,
    CartComponent,
    ThanhtoanComponent,
    ContactComponent,
    ThongtintaikhoanComponent,
    DonhangComponent,
    ChitietdonhangComponent,
    BolocComponent,
    MagiamgiaComponent,
    BaivietComponent,
    HttpClientModule,
    ToastModule,
    FormsModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FE_BanHang';
}
