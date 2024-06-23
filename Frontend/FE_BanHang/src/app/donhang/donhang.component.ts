import { CommonModule } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../api.service';
import { DonhangGiohangService } from '../donhang-giohang.service';
import { MessageService } from 'primeng/api';
import { StorageMap } from '@ngx-pwa/local-storage';
import { RouterModule } from '@angular/router';

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
  selector: 'app-donhang',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FormatVndPipe,
  ],
  providers: [
    ApiService,
    DonhangGiohangService,
    MessageService
  ],
  templateUrl: './donhang.component.html',
  styleUrl: './donhang.component.css'
})
export class DonhangComponent {

  account: any;
  listDonHang: any;

  constructor(
    public _apiService: ApiService,
    public messageService: MessageService,
    private storage : StorageMap
  ) {
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
          this.callAPI();
      }
    );

  }

  callAPI(): void{
    this._apiService.getListDonHang(this.account.id).subscribe(data =>
      {
        this.listDonHang = data;
        console.log(this.listDonHang);
      }
    )
  }
}
