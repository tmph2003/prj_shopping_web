import { CommonModule } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../api.service';
import { DonhangGiohangService } from '../donhang-giohang.service';
import { MessageService } from 'primeng/api';
import { StorageMap } from '@ngx-pwa/local-storage';
import { RatingModule } from 'primeng/rating';
import {SelectButtonModule} from 'primeng/selectbutton';

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
  selector: 'app-yeuthich',
  standalone: true,
  imports: [
    InputNumberModule,
    ButtonModule,
    InputTextareaModule,
    RouterOutlet,
    RouterModule,
    FormatVndPipe,
    FormsModule,
    ToastModule,
    CommonModule,
    RatingModule,
    SelectButtonModule
  ],
  providers: [
    ApiService,
    DonhangGiohangService,
    MessageService,
  ],
  templateUrl: './yeuthich.component.html',
  styleUrl: './yeuthich.component.css'
})
export class YeuthichComponent {
  listSanPham: any;
  account: any;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap,
    private _donHangGioHangService: DonhangGiohangService,
    private _messageService: MessageService,
  ) {
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        this.callApi();
      }
    );

  }

  callApi() {
    this._apiService.getAllSanPhamYeuThich(this.account.id).subscribe(rs => {
      this.listSanPham = rs;
      console.log(rs);
      this.listSanPham.forEach((element: any) => {
        element.kichCo = element.kichCo.split(',').map((item: any) => ({ kichCo: item.trim() }));
      });
      console.log(this.listSanPham);
    });
  }

  xoaSanPhamYeuThich(idSanPham: any)
  {
    if(!this.account)
      return;
    this._apiService.deleteYeuThich(idSanPham, this.account.id).subscribe(rs => {
      this.callApi();
    });
  }
}
