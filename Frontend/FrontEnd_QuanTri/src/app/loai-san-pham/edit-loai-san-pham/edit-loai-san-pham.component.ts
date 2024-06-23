import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-loai-san-pham',
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
  ],
  templateUrl: './edit-loai-san-pham.component.html',
  styleUrl: './edit-loai-san-pham.component.css',
})
export class EditLoaiSanPhamComponent {
  id: any;
  tenLoai: any;
  mota: any;
  ngayTao: any;
  check: boolean = false;
  loaiSanPhamSelected: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.route.paramMap.subscribe((params) => {
      this.apiService.getLoaiSanPhamById(params.get('id')).subscribe((data) => {
        this.loaiSanPhamSelected = data;
        this.id = this.loaiSanPhamSelected.id;
        this.tenLoai = this.loaiSanPhamSelected.tenLoai;
        this.mota = this.loaiSanPhamSelected.moTa;
        this.ngayTao = this.loaiSanPhamSelected.ngayTao;
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
      document.querySelectorAll('input.not-require');
    input1Elements.forEach((inputElement: HTMLInputElement) => {
      inputElement.style.border = '0.5px solid #60d83c';
    });

    if (!this.tenLoai || !this.mota) {
      return;
    } else {
      const loaiSanPham: any = JSON.parse(
        `{"id":"${this.id}",
          "tenLoai":"${this.tenLoai}",
          "moTa":"${this.mota}",
          "ngayTao":"${this.ngayTao}"}`
      );
      this.apiService.put_LoaiSanPham(this.id, loaiSanPham).subscribe(() => {
        this.router.navigate(['/loaisanpham']);
      });
    }
  }
  onBack() {
    this.router.navigate(['/loaisanpham']);
  }
}
