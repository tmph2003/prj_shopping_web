import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
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
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-san-pham',
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
  templateUrl: './add-san-pham.component.html',
  styleUrl: './add-san-pham.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AddSanPhamComponent implements OnInit {
  loaiSanPhamList: any[] = [];
  loaiSanPhamSelected: any;
  check: boolean = false;
  loaisanpham: any;
  masanpham: any;
  tensanpham: any;
  gia: any;
  chatlieu: any;
  anh: any;
  mota: any;
  ghichu: any;
  fileName: any;
  checkMa: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.apiService.getAll_LoaiSanPham().subscribe((res: any) => {
      this.loaiSanPhamList = res;
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

    //Check ma san pham
    this.apiService.checkMaSanPham(this.masanpham).subscribe((flag) => {
      this.checkMa = flag;
      let inputMaSanPhams: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('#masanpham');
      if (this.checkMa) {
        inputMaSanPhams.forEach((inputElement: HTMLInputElement) => {
          inputElement.style.border = '0.5px solid red';
        });
      }
    });

    if (
      !this.loaiSanPhamSelected ||
      !this.masanpham ||
      !this.tensanpham ||
      !this.gia ||
      !this.anh
    ) {
      return;
    } else {
      const sanpham: any = JSON.parse(
        `{"loaiSanPhamId":"${this.loaiSanPhamSelected}",
        "maSanPham":"${this.masanpham}",
        "ten":"${this.tensanpham}",
        "moTa":"${this.mota}",
        "ghiChu":"${this.ghichu}",
        "gia":"${this.gia}",
        "chatLieu":"${this.chatlieu}",
        "duongDanAnh":"http://localhost:9000/assets/AnhSanPham/${this.fileName}",
        "giaSauGiam":"${this.gia}"}`
      );
      this.apiService.post_SanPham(sanpham).subscribe(() => {
        this.router.navigate(['/sanpham']);
      });
    }
  }
  onChangeImage(event: any) {
    this.anh = null;
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.fileName = file.name;
      console.log(file);
      this.apiService.uploadFile(file).subscribe(
        (response) => {
          this.anh = `http://localhost:9000/assets/AnhSanPham/${this.fileName}`;
        },
        (error) => {
          this.anh = `http://localhost:9000/assets/AnhSanPham/${this.fileName}`;
        }
      );
    }
  }
  onBack() {
    this.router.navigate(['/sanpham']);
  }
}
