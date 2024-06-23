import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from '../../api.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-san-pham',
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
  templateUrl: './edit-san-pham.component.html',
  styleUrl: './edit-san-pham.component.css',
  providers: [MessageService, ConfirmationService],
})
export class EditSanPhamComponent {
  loaiSanPhamList: any[] = [];
  loaiSanPhamSelected: any;
  check: boolean = false;
  masanpham: any;
  tensanpham: any;
  gia: any;
  mota: any;
  ghichu: any;
  chatlieu: any;
  anh: any;
  ngaytao: any;
  ngaycapnhat: any;
  sanPhamSelected: any;
  fileName: any;
  checkMa: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.apiService.getAll_LoaiSanPham().subscribe((res: any) => {
      this.loaiSanPhamList = res;
    });
    this.route.paramMap.subscribe((params) => {
      this.apiService.getSanPhamById(params.get('id')).subscribe((data) => {
        this.sanPhamSelected = data;
        this.loaiSanPhamSelected = this.sanPhamSelected.loaiSanPhamId;
        this.masanpham = this.sanPhamSelected.maSanPham;
        this.tensanpham = this.sanPhamSelected.ten;
        this.gia = this.sanPhamSelected.gia;
        this.chatlieu = this.sanPhamSelected.chatLieu;
        this.anh = this.sanPhamSelected.duongDanAnh;
        this.mota = this.sanPhamSelected.moTa;
        this.ghichu = this.sanPhamSelected.ghiChu;
        this.ngaytao = this.sanPhamSelected.ngayTao;
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

    let input1Elements: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('input.not_require');
    input1Elements.forEach((inputElement: HTMLInputElement) => {
      inputElement.style.border = '0.5px solid #60d83c';
    });
    if (
      !this.loaiSanPhamSelected ||
      !this.masanpham ||
      !this.tensanpham ||
      !this.gia ||
      !this.anh
    ) {
      return;
    }

    console.log(this.sanPhamSelected);
    this.apiService
      .put_SanPham(this.sanPhamSelected.id, this.sanPhamSelected)
      .subscribe(() => {
        this.router.navigate(['/sanpham']);
      });
  }
  onChangeImage(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.fileName = file.name;
      console.log(file);
      this.apiService.uploadFile(file).subscribe(
        (response) => {
          this.sanPhamSelected.duongDanAnh = `http://localhost:9000/assets/AnhSanPham/${this.fileName}`;
        },
        (error) => {
          this.sanPhamSelected.duongDanAnh = `http://localhost:9000/assets/AnhSanPham/${this.fileName}`;
        }
      );
    }
  }
  onBack() {
    this.router.navigate(['/sanpham']);
  }
}
