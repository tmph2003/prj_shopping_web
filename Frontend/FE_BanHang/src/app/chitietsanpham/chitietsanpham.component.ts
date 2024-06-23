import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnChanges, Pipe, PipeTransform, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import {ImageModule} from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { GalleriaModule } from 'primeng/galleria';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ScrollerModule} from 'primeng/scroller';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {DialogService} from 'primeng/dynamicdialog';
import { DangnhapService } from '../dangnhap.service';


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

@Pipe({
  standalone: true,
  name: 'roundDecimal'
})
export class RoundDecimalPipe implements PipeTransform {
  transform(value: number): number {
    // Làm tròn số với một chữ số thập phân
    return Math.round(value * 10) / 10;
  }
}

@Pipe({
  standalone: true,
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Xử lý trường hợp không có giá trị đầu vào

    // Chuyển đổi chuỗi ngày tháng từ '2024-05-05T18:03:19.753' sang định dạng 'hh:mm dd/mm/yyyy'
    const dateObj = new Date(value);
    const time = dateObj.toLocaleTimeString(); // Lấy giờ phút
    const date = dateObj.toLocaleDateString(); // Lấy ngày tháng

    return `${time} ${date}`; // Kết hợp giờ phút và ngày tháng
  }
}

@Component({
  selector: 'app-chitietsanpham',
  standalone: true,
  imports: [
    RatingModule,
    InputNumberModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ImageModule,
    ButtonModule,
    SelectButtonModule,
    GalleriaModule,
    RouterModule,
    RouterOutlet,
    FormatVndPipe,
    DateFormatPipe,
    ToastModule,
    RoundDecimalPipe,
    ScrollerModule,
    DialogModule
  ],
  providers: [
    ApiService,
    MessageService,
    DatePipe,
    DialogService
  ],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent{

  minSelect = 0;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  colors: { id: number, name: string }[] = [
    { id: 1, name: "Đỏ" },
    { id: 2, name: "Cam"},
    { id: 3, name: "Vàng"},
    { id: 4, name: "Xanh lục"},
    { id: 5, name: "Xanh dương"},
    { id: 6, name: "Tím"},
    { id: 7, name: "Đen"},
    { id: 8, name: "Trắng"},
  ];
  sizes: {size: number}[] = [
    {size: 35},
    {size: 36},
    {size: 37},
    {size: 38},
    {size: 39},
    {size: 40},
    {size: 41},
    {size: 42},
    {size: 43},
    {size: 44},
    {size: 45},
  ]

  colorSelected: any;
  sizeSelected: any;
  sanPham: any;
  listSPCungLoai: any;
  listKichCoMau: any;
  listKichCo: any;
  listMau: any;
  listAnh: any;
  account: any;
  sanPhamDanhGia: any;
  isYeuThich = false;
  showTimSize = false;

  soLuongMua = 1;

  tenLoaiSanPham = "";
  id: string = "";
  spConLai = 0;


  nhanXet: any;
  userRating: any;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap,
    public router: Router,
    private _messageService: MessageService,
  ){

    this.route.params.subscribe(params => {
      this.spConLai = 0;
      this.sizeSelected = null;
      const id = params['id'];
      this.id = id;
      if (id !== null && id !== "") {
        this._apiService.getSanPhamById(id).subscribe(data => {
          this.sanPham = data;
          this._apiService.getLoaiSanPhamById(data.loaiSanPhamId).subscribe(lsp => {
            this.tenLoaiSanPham = lsp.tenLoai;
          })
          this._apiService.getSanPhamByDanhMuc(data.loaiSanPhamId).subscribe(lstSanPham => {
            this.listSPCungLoai = lstSanPham;
          })
          this._apiService.getSanPhamKichCoBySanPham(this.id).subscribe(kc => {
            this.listKichCoMau = kc;
            this.listKichCo = [...new Set(kc.map((item: any) => item.kichCo))];
            this.listMau = [...new Set(kc.map((item: any) => item.mau))];
          })
          this._apiService.getAnhSanPhamBySanPham(this.id).subscribe(kc => {
            this.listAnh = kc;
          })
        })
        this._apiService.getListDanhGiaByIdSanPham(this.id).subscribe(data =>{
          this.sanPhamDanhGia = data;
          console.log(data);
        });
      }
      const storedValueAccount = storage.get('account').subscribe(data =>
        {
          this.account = data;
          this.checkYeuThich().then(ckyt => {
            if(ckyt)
              this.isYeuThich = true;
            else
              this.isYeuThich = false;
          })
        }
      );
    });

  }

  doiMau(): void{
    if(!this.colorSelected)
    {
      this.listKichCo = [...new Set(this.listKichCoMau.map((item: any) => item.kichCo))];
    }
    else
    this.listKichCo = [...new Set(this.listKichCoMau.filter((item:any) => item.mau == this.colorSelected).map((item: any) => item.kichCo))];
    console.log(this.listKichCo);
    if(!this.sizeSelected || !this.colorSelected)
    {
      this.spConLai = 0;
      return;
    }

    var fd = this.listKichCoMau.find((product: any) => {
      return product.kichCo == this.sizeSelected && product.mau == this.colorSelected
    })
  }

  doiKichThuoc(): void{
    if(!this.sizeSelected)
    {
      this.listMau = [...new Set(this.listKichCoMau.map((item: any) => item.mau))];
    }
    else
      this.listMau = [...new Set(this.listKichCoMau.filter((item:any) => item.kichCo == this.sizeSelected).map((item: any) => item.mau))];
    if(!this.sizeSelected || !this.colorSelected)
    {
      this.spConLai = 0;
      return;
    }
    console.log(this.listKichCoMau);
    var fd = this.listKichCoMau.find((product: any) => {
      return product.kichCo == this.sizeSelected && product.mau == this.colorSelected
    }
    );
    console.log(fd);
    this.spConLai = parseInt(fd != null ? fd.soLuong : 0);
  }

  spKhac(id: any): void{
    this.sizeSelected = null;
    this.colorSelected = null;
  }

  checkDangNhap(): void{
    const storedValue = this.storage.get('isDangNhap').subscribe(data =>
      {
        if(typeof(data) == 'boolean')
          if(data == false)
            this.router.navigate(['/login']);
          else
          {
            this.postSanPhamGioHang();
          }
      }
    );

  }
  postSanPhamGioHang(): void{
    if(this.colorSelected == null)
    {
      this._messageService.add({severity:'info', summary: 'Thông báo', detail: 'Vui lòng chọn màu trước khi thêm', life: 3000});
      return;
    }
    if(this.sizeSelected == null)
    {
      this._messageService.add({severity:'info', summary: 'Thông báo', detail: 'Vui lòng chọn size  trước khi thêm', life: 3000});
      return;
    }
    let intMau =0;
    // for(let i = 0; i < this.colors.length; i++)
    // {
    //   if(this.colors[i].name == this.colorSelected)
    //     intMau = this.colors[i].id;
    // }
    const body = {
      "sanPhamId": this.id,
      "gioHangId": this.account.id,
      "soLuong": this.soLuongMua,
      "mau": this.colorSelected,
      "kichCo": this.sizeSelected
    }
    console.log(body);
    this._apiService.postSanPhamGioHang(body).subscribe(data => {

      console.log(data);
      if(data.status == 'error')
        {
          this._messageService.add({severity:'error', summary: 'Thông báo', detail: 'Có lỗi xảy ra, hãy thử lại sau!', life: 3000});

        }
        else
        {
          this._messageService.add({severity:'success', summary: 'Thông báo', detail: 'Thêm sản phẩm vào giỏ hàng thành công', life: 3000});
          this._apiService.getSoLuongTrongGio(this.account.id).subscribe(ans => {
            DangnhapService.soSPTrongGioSubject.next(ans);
          })
        }
    })
  }

  checkYeuThich(): Promise<boolean> {
    if(!this.account)
    {
      return Promise.resolve(false);
    }
    return this._apiService.checkYeuThich(this.id, this.account.id).then(data => {
      if(data)
        return true;
      return false;
    });
  }
  themYeuThich() {
    if(!this.account)
    {
      this._messageService.add({severity:'info', summary: 'Thông báo', detail: 'Vui lòng đăng nhập trước khi thực hiện thao tác', life: 3000});
    }
    const body = {
      SanPhamId: this.id,
      AccountId: this.account.id,
    }
    this._apiService.postYeuThich(body).subscribe(data => {
      this.isYeuThich = true;
    }

    );
  }
  boYeuThich(){
    if(!this.account)
    {
      this._messageService.add({severity:'info', summary: 'Thông báo', detail: 'Vui lòng đăng nhập trước khi thực hiện thao tác', life: 3000});
    }
    this._apiService.deleteYeuThich(this.id, this.account.id).subscribe(rs => {
      this.isYeuThich = false;
    });
  }


}
