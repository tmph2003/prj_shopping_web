import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-tai-khoan',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './edit-tai-khoan.component.html',
  styleUrl: './edit-tai-khoan.component.css',
})
export class EditTaiKhoanComponent {
  id: any;
  tendangnhap: any;
  tenhienthi: any;
  matkhau: any;
  vaitro: boolean = true;
  gioitinh: boolean = true;
  ngaysinh: any;
  email: any;
  sodienthoai: any;
  anh: any;
  ngayTao: any;
  check: boolean = false;
  taiKhoanSelected: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.route.paramMap.subscribe((params) => {
      this.apiService.getAccountById(params.get('id')).subscribe((data) => {
        this.taiKhoanSelected = data;
        this.id = this.taiKhoanSelected.id;
        this.tendangnhap = this.taiKhoanSelected.tenDangNhap;
        this.tenhienthi = this.taiKhoanSelected.tenHienThi;
        this.matkhau = this.taiKhoanSelected.matKhau;
        this.vaitro = this.taiKhoanSelected.vaiTro;
        this.gioitinh = this.taiKhoanSelected.gioiTinh;
        this.ngaysinh = this.taiKhoanSelected.ngaySinh;
        this.email = this.taiKhoanSelected.email;
        this.sodienthoai = this.taiKhoanSelected.soDienThoai;
        this.anh = this.taiKhoanSelected.duongDanAnh;
        this.ngayTao = this.taiKhoanSelected.ngayTao;
      });
    });
  }
  onSubmit() {
    this.check = true;
    let inputElements: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('input.require');
    inputElements.forEach((inputElement: HTMLInputElement) => {
      if (!inputElement.value) inputElement.style.border = '0.5px solid red';
      else {
        inputElement.style.border = '0.5px solid #60d83c';
      }
    });

    if (
      !this.tendangnhap ||
      !this.tenhienthi ||
      !this.matkhau ||
      !this.vaitro ||
      !this.gioitinh ||
      !this.ngaysinh ||
      !this.email ||
      !this.sodienthoai ||
      !this.anh
    ) {
      return;
    } else {
      const account: any = JSON.parse(
        `{"id":"${this.id}",
          "tenDangNhap":"${this.tendangnhap}",
          "tenHienThi":"${this.tenhienthi}",
          "matKhau":"${this.matkhau}",
          "vaiTro":${this.vaitro},
          "gioiTinh":${this.gioitinh},
          "ngaySinh":"${this.ngaysinh}",
          "email":"${this.email}",
          "soDienThoai":"${this.sodienthoai}",
          "duongDanAnh":"${this.anh}",
          "ngayTao":"${this.ngayTao}"}`
      );
      this.apiService.put_Account(this.id, account).subscribe(() => {
        this.router.navigate(['/taikhoan']);
      });
    }
  }
  onBack() {
    this.router.navigate(['/taikhoan']);
  }
}
