
import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { DangnhapService } from '../dangnhap.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-thongtintaikhoan',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ToastModule,
    RadioButtonModule
  ],
  providers: [
    ApiService,
    MessageService,
    DangnhapService
  ],
  templateUrl: './thongtintaikhoan.component.html',
  styleUrl: './thongtintaikhoan.component.css'
})
export class ThongtintaikhoanComponent {
  account: any;
  diachi: any;

  quan: any;
  xa: any;
  ghiChu: any;
  thanhPho: any;

  constructor(
    public _dangNhapService: DangnhapService,
    public _apiService: ApiService,
    public messageService: MessageService,
    private storage : StorageMap
  ) {
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
        {
          this.callAPI();
        }
      }
    );
  }

  callAPI(): void{
    this._apiService.getDiaChiByIdUser(this.account.id).subscribe(data => {
      this.diachi = data;
    })
    this._apiService.getAccountById(this.account.id).subscribe(data =>{
      this.account = data;
    })
  }

  themDiaChi(): void{
    const dc = {
      accountId: this.account.id,
      huyen: this.quan,
      xa: this.xa,
      tinh: this.thanhPho,
      ghiChu: this.ghiChu,
    }
    this._apiService.postDiaChiByUser(dc).subscribe(dt => {
      this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Thêm địa chỉ thành công', life: 3000});
      this.callAPI();
    })
  }

  xoaDiaChi(id: any): void{
    this._apiService.deleteDiaChi(id).subscribe(data => {
      this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Xóa địa chỉ thành công', life: 3000});
      this.callAPI();
    })

  }
  putUser(): void{
    if(this.account.gioiTinh == 1)
      this.account.gioiTinh = true;
    else
      this.account.gioiTinh = false;
    this._apiService.putUser(this.account).subscribe(data => {
      this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Sửa thông tin người dùng thành công', life: 3000});
      this._dangNhapService.updateData(true, this.account);
      this.callAPI();
    })
  }

}
