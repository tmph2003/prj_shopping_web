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
  selector: 'app-boloc',
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
  templateUrl: './boloc.component.html',
  styleUrl: './boloc.component.css'
})
export class BolocComponent {
  title = "";
  sortTitle = "";
  listSanPham: any;
  lg: number = 0;
  id: any;
  lstLoaiSanPham: any;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap
  ){




    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== null && id !== "") {
        this.id = id;
        this.setTitle();
        this._apiService.getLoaiSanPham().subscribe(data => {
          this.lstLoaiSanPham = data;
          this.lstLoaiSanPham.unshift({ id: '00000000-0000-0000-0000-000000000000', tenLoai: 'Tất cả sản phẩm' });
        })

        this.locDuLieu(0, this.id);

      }
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title = "Tất cả sản phẩm";
    this.sortTitle = "Sắp xếp theo";
    this.setTitle();
  }

  setTitle(): void{
    this.sortTitle = "Sắp xếp theo";
    switch(this.id)
        {
          case 'D4F1D78D-7505-4041-8F36-68200096E893':
            this.title = "Nón"
            break;
          case '36A8691F-7AB8-4148-A19E-1A65F8C9E04B':
            this.title = "Đồng hồ"
            break;
          case '71A9CE9B-559D-4EB3-9727-E659FB1F8D95':
            this.title = "Chân váy"
            break;
          case 'AF60CBAC-CC26-414A-98DE-0ADD96792401':
            this.title = "Quần joggers"
            break;
          case '21729103-15E7-4448-9309-DE07B2720E03':
            this.title = "Quần shorts"
            break;
          case 'FDD00170-D6FD-4749-9D08-E351F09461B7':
            this.title = "Quần jeans"
            break;
          case '44A4EC7A-7EE6-4C92-A311-73F1DB460FEA':
            this.title = "Áo bomber"
            break;
          case '9CA5D890-DAC1-467A-B06A-28CF711AA898':
            this.title = "Áo sweater"
            break;
          case 'A2E2E9F9-C630-44EC-AAF4-D83C61CAC11D':
            this.title = "Áo hoodie"
            break;
          case '48F1B6D1-EF14-44ED-8BD9-4305669B74A0':
            this.title = "Áo khoác"
            break;
          case '2904143F-949A-4BF6-A530-A0E9D24507B9':
            this.title = "Áo sơ mi"
            break;
          case 'F5439B71-98C9-4CCE-AC2F-7A689E924CEA':
            this.title = "Áo polo"
            break;
          case '7EEAA5E7-41EF-49A6-AC4D-A23DFFBE3F81':
            this.title = "Áo thun"
            break;
          case '00000000-0000-0000-0000-000000000000':
            this.title = "Tất cả sản phẩm"
        }
  }

  sapXep(num: number): void{

    switch(num)
    {
      //gia giam dan
      case 1:
        this.sortTitle = 'Giá giảm dần';
        this.listSanPham.sort((a: any, b: any) =>
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
        this.listSanPham.sort((a: any, b: any) =>
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
        this.listSanPham.sort((a: any, b: any) => b.danhGia - a.danhGia);
        break;
      //danh gia tang dan
      case 4:
        this.sortTitle = 'Đánh giá tăng dần';
        this.listSanPham.sort((a: any, b: any) => a.danhGia - b.danhGia);
        break;
    }
  }

  locDuLieu(page: number, id: string): void{
    this._apiService.getSanPhamByPage(page, this.id).subscribe(sp => {
      this.listSanPham = sp;
    });
    this._apiService.getSLSanPhamByDanhMuc(this.id).subscribe(sp => {
      this.lg = sp;
    });
  }

  changeTitle(title: string): void{
    this.title = title;
  }

  onPageChange(event: any)
  {
    this.locDuLieu(event.page, this.id);
    this.sortTitle = 'Sắp xếp theo';
  }
}
