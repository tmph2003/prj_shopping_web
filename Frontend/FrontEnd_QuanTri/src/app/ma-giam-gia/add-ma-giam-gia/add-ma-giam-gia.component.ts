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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ma-giam-gia',
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
  templateUrl: './add-ma-giam-gia.component.html',
  styleUrl: './add-ma-giam-gia.component.css',
})
export class AddMaGiamGiaComponent {
  soLuong: any;
  ma: any;
  luongGiam: any;
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

    if (!this.soLuong || !this.ma || !this.luongGiam) {
      return;
    } else {
      const maGiamGia: any = JSON.parse(
        `{"soLuong":"${this.soLuong}",
          "ma":"${this.ma}",
          "luongGiam":"${this.luongGiam}"}`
      );
      this.apiService.post_MaGiamGia(maGiamGia).subscribe(() => {
        this.router.navigate(['/magiamgia']);
      });
    }
  }
  onBack() {
    this.router.navigate(['/magiamgia']);
  }
}
