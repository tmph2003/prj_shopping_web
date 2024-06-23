import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ma-giam-gia',
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
    HttpClientModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './edit-ma-giam-gia.component.html',
  styleUrl: './edit-ma-giam-gia.component.css',
})
export class EditMaGiamGiaComponent {
  id: any;
  soLuong: any;
  ma: any;
  luongGiam: any;
  ngayTao: any;
  maGiamGiaSelected: any;
  check: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.route.paramMap.subscribe((params) => {
      this.apiService.getMaGiamGiaById(params.get('id')).subscribe((data) => {
        this.maGiamGiaSelected = data;
        this.id = this.maGiamGiaSelected.id;
        this.soLuong = this.maGiamGiaSelected.soLuong;
        this.ma = this.maGiamGiaSelected.ma;
        this.luongGiam = this.maGiamGiaSelected.luongGiam;
        this.ngayTao = this.maGiamGiaSelected.ngayTao;
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
    if (!this.soLuong || !this.ma || !this.luongGiam) {
      return;
    } else {
      const maGiamGia: any = JSON.parse(
        `{"id":"${this.id}",
          "soLuong":"${this.soLuong}",
          "ma":"${this.ma}",
          "luongGiam":"${this.luongGiam}",
          "ngayTao":"${this.ngayTao}"}`
      );
      console.log(maGiamGia);
      this.apiService.put_MaGiamGia(this.id, maGiamGia).subscribe(() => {
        this.router.navigate(['/magiamgia']);
      });
    }
  }
  onBack() {
    this.router.navigate(['/magiamgia']);
  }
}
