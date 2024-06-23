import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import {PaginatorModule} from 'primeng/paginator';
import { ApiService } from '../api.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CommonModule } from '@angular/common';
import { DeclarationListEmitMode } from '@angular/compiler';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CarouselModule} from 'primeng/carousel';

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
  selector: 'app-timkiem',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    PaginatorModule,
    FormatVndPipe,
    RouterOutlet,
    RouterModule,
    ProgressSpinnerModule,
    CommonModule,
    CarouselModule
  ],
  providers: [
    ApiService
  ],
  templateUrl: './timkiem.component.html',
  styleUrl: './timkiem.component.css'
})
export class TimkiemComponent {
  title = "";
  sortTitle = "";
  // listSanPham: any;
  lg: number = 0;
  searchKey: any;
  lstSanPham: any;
  routeSub: any;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap
  ){




    this.route.params.subscribe(params => {
      const searchKey = params['searchKey'];
      if (searchKey !== null && searchKey !== "") {
        this.searchKey = searchKey;
        this._apiService.getSanPhamBySearchKey(searchKey).subscribe(data => {
          this.lstSanPham = data;
          this.changeTitle(searchKey);
        })

      }
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title = `Tìm kiếm sản phẩm: ${this.searchKey}`;
    this.sortTitle = "Sắp xếp theo";
    this.routeSub = this.route.params.subscribe(params => {
      this.searchKey = params['searchKey'];
    });
  }


  sapXep(num: number): void{

    switch(num)
    {
      //gia giam dan
      case 1:
        this.sortTitle = 'Giá giảm dần';
        this.lstSanPham.sort((a: any, b: any) =>
          {
            if(b.giaSauGiam == null && a.giaSauGiam == null)
              return b.gia - a.gia
            else if(b.giaSauGiam == null)
              return b.gia - a.giaSauGiam
            else if(a.giaSauGiam == null)
              return b.giaSauGiam - a.gia
            else
              return b.giaSauGiam - a.giaSauGiam
          }
        );
        break;
      //gia tang dan
      case 2:
        this.sortTitle = 'Giá tăng dần';
        this.lstSanPham.sort((a: any, b: any) =>
          {
            if(b.giaSauGiam == null && a.giaSauGiam == null)
              return a.gia - b.gia
            else if(b.giaSauGiam == null)
              return a.gia - b.giaSauGiam
            else if(a.giaSauGiam == null)
              return a.giaSauGiam - b.gia
            else
              return a.giaSauGiam - b.giaSauGiam
          }
        );
        break;
        break;
      //danh gia giam dan
      case 3:
        this.sortTitle = 'Đánh giá giảm dần';
        this.lstSanPham.sort((a: any, b: any) => b.danhGia - a.danhGia);
        break;
      //danh gia tang dan
      case 4:
        this.sortTitle = 'Đánh giá tăng dần';
        this.lstSanPham.sort((a: any, b: any) => a.danhGia - b.danhGia);
        break;
    }
  }

  changeTitle(title: string): void{
    this.title = `Tìm kiếm sản phẩm: ${title}`;
  }

}
