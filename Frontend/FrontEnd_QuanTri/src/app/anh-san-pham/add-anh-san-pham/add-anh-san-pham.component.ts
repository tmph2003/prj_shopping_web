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
  selector: 'app-add-anh-san-pham',
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
  templateUrl: './add-anh-san-pham.component.html',
  styleUrl: './add-anh-san-pham.component.css',
})
export class AddAnhSanPhamComponent {
  sanPhamIdList: any[] = [];
  sanPhamIdSelected: any;
  tenSanPham: any;
  check: boolean = false;
  anh: any;
  fileName: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.apiService.getAll_SanPham().subscribe((res: any) => {
      this.sanPhamIdList = res;
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

    if (!this.sanPhamIdSelected || !this.anh) {
      return;
    } else {
      const anhsanpham: any = JSON.parse(
        `{"sanPhamId":"${this.sanPhamIdSelected}",
        "duongDan":"http://localhost:9000/assets/AnhSanPham/${this.fileName}"}`
      );
      this.apiService.post_AnhSanPham(anhsanpham).subscribe(() => {
        this.router.navigate(['/anhsanpham']);
      });
    }
  }
  onChangeImage(event: any) {
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
    this.router.navigate(['/anhsanpham']);
  }
}
