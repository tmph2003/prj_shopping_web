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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-loai-san-pham',
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
  templateUrl: './add-loai-san-pham.component.html',
  styleUrl: './add-loai-san-pham.component.css',
})
export class AddLoaiSanPhamComponent {
  tenLoai: any;
  mota: any;
  check: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
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

    if (!this.tenLoai || !this.mota) {
      return;
    } else {
      const loaiSanPham: any = JSON.parse(
        `{"tenLoai":"${this.tenLoai}",
          "moTa":"${this.mota}"}`
      );
      this.apiService.post_LoaiSanPham(loaiSanPham).subscribe(() => {
        this.router.navigate(['/loaisanpham']);
      });
    }
  }
  onBack() {
    this.router.navigate(['/loaisanpham']);
  }
}
