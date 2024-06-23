import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    ToastModule,
    InputNumberModule,
    RadioButtonModule,
    CalendarModule,
    PasswordModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [
    ApiService,
    MessageService
  ],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css'
})
export class DangkyComponent {

  showConfirmEmail = false;
  codeInput: any;
  codeConfirm: any;
  hoVaTen: any;
  tenDangNhap: any;
  password: any;
  vaitro = false;
  gioiTinh = 1;
  ngaySinh: any;
  sdt: any;
  disableGuiLai = false;

  email: any;
  rqUserName: any;
  rqPassword: any;

  constructor(
    private _apiService: ApiService,
    public messageService: MessageService,
  ){

  }

  async showConfirmDialog() {

    let checkRQ = false;
    if(this.tenDangNhap == null || this.tenDangNhap == "")
    {
      this.rqUserName = "Tên đăng nhập không được để trống";
      checkRQ = true;
    }
    else
    this.rqUserName = null;
    if(this.password == null || this.password == "")
    {
      this.rqPassword = "Mật khẩu không được để trống";
      checkRQ = true;
    }
    else
    this.rqPassword = null;
    if(checkRQ)
      {
        return;
      }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Kiểm tra email với biểu thức chính quy
    let ck = emailRegex.test(this.email);
    if(!ck)
    {
      this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Email không đúng định dạng, vui lòng kiểm tra lại', life: 3000})
      return;
    }

    //kiem tra username
    let ckUsername = false;
    await this._apiService.checkUsername(this.tenDangNhap).subscribe(data => {
      if(data == false)
      {
        this.showConfirmEmail = true;

        let randomNumberString: string = '';
        for (let i = 0; i < 4; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
            randomNumberString += randomNumber.toString();
        }
        this.codeConfirm = randomNumberString;
        this._apiService.guiEmailConfirm(this.email, randomNumberString).subscribe();
      }
      else
      {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Tên đăng nhập đã tồn tại, vui lòng thử lại', life: 3000});
        return;
      }
    });


  }

  checkCode() {
    if(this.codeInput != this.codeConfirm)
    {
      this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Mã xác nhận không chính xác', life: 3000});
    }
    else
    {
      let gt;
      if(this.gioiTinh == 1)
      {
        gt = true;
      }
      else
      {
        gt = false;
      }
      let formattedNgaySinh = new Date(this.ngaySinh).toISOString().split('T')[0];
      const body = {
        tenDangNhap: this.tenDangNhap,
        tenHienThi: this.hoVaTen,
        matKhau: this.password,
        vaiTro: this.vaitro,
        gioiTinh: gt,
        ngaySinh: formattedNgaySinh,
        soDienThoai: this.sdt,
        email: this.email,
        duongDanAnh: 'https://cdnphoto.dantri.com.vn/8w3URKZ3wSPLSitAFORfdXr81xE=/thumb_w/960/2021/02/14/1-lexus-lx-570-2021-15-1613236617688.jpg'
      }
      this._apiService.postAccount(body).subscribe(result => {
          this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Đăng ký tài khoản thành công', life: 3000});
          this.showConfirmEmail = false;
      })
    }
  }

  guiLai(){
    this.disableGuiLai = true;
    this.showConfirmDialog();
    this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Đã gửi lại mã xác nhận', life: 3000});
    setTimeout(() => {
      this.disableGuiLai = false;
    }, 5000);
  }
}
