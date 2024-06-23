import { CommonModule } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Pipe({ standalone: true, name: 'formatVnd' })
export class FormatVndPipe implements PipeTransform {
  transform(value: any): string {
    const soTien: number = parseFloat(value);

    // Kiểm tra nếu giá trị là NaN hoặc không phải số
    if (isNaN(soTien)) {
      // Trả về giá trị không thay đổi nếu không phải số
      return value;
    }

    // Định dạng số tiền trong đơn vị VND
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(soTien);
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    RouterOutlet,
    CarouselModule,
    ButtonModule,
    RatingModule,
    ProgressSpinnerModule,
    FormatVndPipe,
    FormsModule
  ],
  providers: [
    ApiService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  sanPhamMoiVe: any;
  sanPhamMuaNhieu: any;

  constructor(
    private _apiService: ApiService
  ){
    this._apiService.getSanPhamMoiVe(10).subscribe(data => {
      this.sanPhamMoiVe = data;
    });
    this._apiService.getSanPhamNhieuLuotMua().subscribe(data => {
      this.sanPhamMuaNhieu = data;
    });
  }


  ngOnInit(): void {

  }

}
