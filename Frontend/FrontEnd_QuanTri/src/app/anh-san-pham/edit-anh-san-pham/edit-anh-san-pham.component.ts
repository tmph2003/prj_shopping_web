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
  selector: 'app-edit-anh-san-pham',
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
  templateUrl: './edit-anh-san-pham.component.html',
  styleUrl: './edit-anh-san-pham.component.css',
})
export class EditAnhSanPhamComponent {
  sanPhamIdList: any[] = [];
  id: any;
  sanPhamIdSelected: any;
  maSanPham: any;
  tenSanPham: any;
  check: boolean = false;
  anh: any;
  fileName: any;
  anhSanPhamSelected: any;
  ngayTao: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.apiService.getAll_SanPham().subscribe((res: any) => {
      this.sanPhamIdList = res;
    });
    this.route.paramMap.subscribe((params) => {
      this.apiService.getAnhSanPhamById(params.get('id')).subscribe((data) => {
        this.anhSanPhamSelected = data;
        this.id = this.anhSanPhamSelected.id;
        this.sanPhamIdSelected = this.anhSanPhamSelected.sanPhamId;
        this.anh = this.anhSanPhamSelected.duongDan;
        this.ngayTao = this.anhSanPhamSelected.ngayTao;
        this.apiService
          .getSanPhamById(this.sanPhamIdSelected)
          .subscribe((res: any) => {
            this.maSanPham = res[0]['maSanPham'];
            this.tenSanPham = res[0]['ten'];
          });
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

    if (!this.sanPhamIdSelected || !this.anh) {
      return;
    } else {
      const anhsanpham: any = JSON.parse(
        `{"id":"${this.id}",
          "sanPhamId":"${this.sanPhamIdSelected}",
          "duongDan":"http://localhost:9000/assets/AnhSanPham/${this.fileName}",
          "ngayTao":"${this.ngayTao}"}`
      );
      this.apiService.put_AnhSanPham(this.id, anhsanpham).subscribe(() => {
        this.router.navigate(['/anhsanpham']);
      });
    }
  }
  onChangeSanPhamId() {
    this.apiService
      .getSanPhamById(this.sanPhamIdSelected)
      .subscribe((res: any) => {
        this.maSanPham = res[0]['maSanPham'];
        this.tenSanPham = res[0]['ten'];
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
