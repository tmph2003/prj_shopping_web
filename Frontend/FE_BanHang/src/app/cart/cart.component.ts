import { Component, Pipe, PipeTransform } from '@angular/core';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';

import {InputTextareaModule} from 'primeng/inputtextarea';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DonhangGiohangService } from '../donhang-giohang.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DangnhapService } from '../dangnhap.service';

@Pipe({ standalone: true, name: 'formatVnd' })
export class FormatVndPipe implements PipeTransform {
  transform(value: any): string {
    const soTien: number = parseFloat(value);

    // Kiểm tra nếu giá trị là NaN hoặc không phải số
    if (isNaN(soTien)) {
      // Trả về giá trị không thay đổi nếu không phải số
      return value;
    }

    // Định dạng số tiền trong đơn vị VND
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(soTien);
  }
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [InputNumberModule,
    ButtonModule,
    InputTextareaModule,
    RouterOutlet,
    RouterModule,
    FormatVndPipe,
    FormsModule,
    ToastModule,
    CommonModule
  ],
  providers: [
    ApiService,
    DonhangGiohangService,
    MessageService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  listSanPham: any;
  account: any;
  ghiChu: any;
  tongTien = 0;
  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap,
    private _donHangGioHangService: DonhangGiohangService,
    private _dangnhapService: DangnhapService,
    private _messageService: MessageService,) {


      const storedValueAccount = storage.get('account').subscribe(data =>
        {
          this.account = data;

          this.callApi();
        }
      );

  }

  tinhTongTien(): void{
    for(let i = 0; i < this.listSanPham.length; i++)
    {
      console.log(this.listSanPham[i].giaSauGiam);
      if(this.listSanPham[i].giaSauGiam)
        this.tongTien += (this.listSanPham[i].giaSauGiam * this.listSanPham[i].soLuong)
      else
        this.tongTien += (this.listSanPham[i].gia * this.listSanPham[i].soLuong);

      DonhangGiohangService.tongTien = this.tongTien;
      DonhangGiohangService.listSanPham = this.listSanPham;

    }

    // this.listSanPham.forEach(element => {

    // });
  }

  callApi(): void{
    this._apiService.getSanPhamInGioHang(this.account.id).subscribe(lstSP =>
      {
        this.listSanPham  = lstSP;
        console.log(this.listSanPham);
        this.tinhTongTien();
        this._apiService.getSoLuongTrongGio(this.account.id).subscribe(ans => {
          DangnhapService.soSPTrongGioSubject.next(ans);
        })
      })
  }

  setGhiChu(): void{
    DonhangGiohangService.ghiChu = this.ghiChu;
  }

  xoaMotSanPhamTrongGio(idSanPham: any, kichCo: any, mau: any): void{
    this._apiService.xoaMotSanPhamTrongGio(this.account.id,idSanPham, kichCo, mau).subscribe(data => {
      this._messageService.add({severity:'success', summary: 'Thông báo', detail: 'Xóa sản phẩm khỏi giỏ hàng thành công', life: 3000});
      this.callApi();
    });
  }

}
