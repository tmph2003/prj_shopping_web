import { ToastModule } from 'primeng/toast';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { DonhangGiohangService } from '../donhang-giohang.service';
import { MessageService } from 'primeng/api';
import { StorageMap } from '@ngx-pwa/local-storage';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import {DialogService} from 'primeng/dynamicdialog';
import { RatingModule } from 'primeng/rating';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

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
  selector: 'app-chitietdonhang',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FormatVndPipe,
    DateFormatPipe,
    ConfirmDialogModule,
    DialogModule,
    RatingModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    ApiService,
    DonhangGiohangService,
    MessageService,
    ConfirmationService,
    DatePipe,
    DialogService
  ],
  templateUrl: './chitietdonhang.component.html',
  styleUrl: './chitietdonhang.component.css'
})
export class ChitietdonhangComponent {
  account: any;
  idDonHang: any;
  DonHang: any;
  listSanPham: any;
  display = false;
  tongTien = 0;
  thanhToan = 0;
  phiVanChuyen = 0;
  sanPhamDanhGia: any;
  sanPhamDanhGiaXem: any;


  displayDanhGia = false;
  displayXemDanhGia = false;
  userRating: any;
  nhanXet: any;
  anhtest: any;
  fileAnhUpload: any;

  constructor(
    public _apiService: ApiService,
    public _messageService: MessageService,
    public router: Router,
    private route: ActivatedRoute,
    private storage : StorageMap,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) {
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
          this.callAPI();
      }
    );

  }

  callAPI(): void{
    this.route.params.subscribe(params => {
      this.idDonHang = params['id'];
      this._apiService.getDonHangById(this.idDonHang).subscribe(data => {
        this.DonHang = data;
        if(!this.DonHang.maGiamGia)
          this.DonHang.luongGiam = 0;
        this._apiService.getListSanPhamByIDDonHang(this.idDonHang, this.account.id).subscribe(data => {
          this.listSanPham = data;
          for(let i = 0; i < this.listSanPham.length; i++)
          {
            if(this.listSanPham[i].giaSauGiam)
            {
              this.tongTien += this.listSanPham[i].giaSauGiam * this.listSanPham[i].soLuong;
            }
            else
            {
              this.tongTien += this.listSanPham[i].gia * this.listSanPham[i].soLuong;
            }
          }
              this.thanhToan = this.tongTien * (1-this.DonHang.luongGiam/100)
          if(this.DonHang.phuongThucVanChuyen == 'Vận chuyển thường')
          {
            this.phiVanChuyen = 25000;
          }
          else
          {
            this.phiVanChuyen = 40000;
          }
          this.thanhToan += this.phiVanChuyen;
          console.log(this.listSanPham);
        });
      });

    });
  }

  huyDonHang(): void{
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn hủy đơn hàng này?',
      accept: async () => {
        const deletePromises = [];
          for(let i = 0; i < this.listSanPham.length; i++)
          {

            const deletePromise =  this._apiService.suaSanPhamTrongDonHang(this.listSanPham[i].sanPhamId, this.DonHang.id, this.listSanPham[i].kichCo, this.listSanPham[i].mau).then();
            deletePromises.push(deletePromise);
          }
          await Promise.all(deletePromises);
          var don = this.DonHang;
          don.trangThai = "Đã hủy";
          await this._apiService.huyDonHangById(this.idDonHang, don);
          this.display = true;
          setTimeout(() => {
            this.router.navigate(['/donhang']);
          }, 2000);
      }
    });
  }

  showDanhGia(item: any): void{
    this.displayDanhGia = true;
    this.sanPhamDanhGia = item;
  }

  xemDanhGia(item: any): void{
    this._apiService.getDanhGiaVeSanPhamByAccount(item.sanPhamId, this.account.id).subscribe(data => {
        this.sanPhamDanhGiaXem = data;
        console.log(this.sanPhamDanhGiaXem)
      }
    );
    this.displayXemDanhGia = true;
  }

  daNhanHang(): void{

  }


  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  myUploader(event: any) {
    for(let i = 0; i < event.files.length; i++)
    {
      const reader = new FileReader();
      //console.log(event.files);
      reader.readAsDataURL(event.files[i])
      reader.onload = (event) => {
        const randomKey = this.generateRandomString(10);
        if(typeof(reader.result) == 'string')
          localStorage.setItem(`${randomKey}`, reader.result);
      }
      console.log("fdsfds");
      //this._apiService.postAnh(event.files[0].objectURL.changingThisBreaksApplicationSecurity).subscribe();
    }
  }

  ganFile(event: any): void{
    this.fileAnhUpload = event;
  }
  xoaGanFile(event: any): void{
  }
  clearGanFile(): void{
    this.fileAnhUpload = null;
  }


  postDanhGia(sanPhamId: any){
    const body = {
      accountId: this.account.id,
      sanPhamId: sanPhamId,
      donHangId: this.DonHang.id,
      noiDung: this.nhanXet,
      vote: this.userRating,
      kichCo: this.sanPhamDanhGia.kichCo,
      mau: this.sanPhamDanhGia.mau
    }

    this._apiService.postDanhGia(body).subscribe(data => {
        /// post anh danh gia
        for(let i = 0; i < this.fileAnhUpload.currentFiles.length; i++)
        {
          const reader = new FileReader();

          reader.readAsDataURL(this.fileAnhUpload.currentFiles[i])
          reader.onload = (event) => {
            const randomKey = this.generateRandomString(10);
            if(typeof(reader.result) == 'string')
              localStorage.setItem(`${randomKey}`, reader.result);


            const bodyAnh = {
              danhGiaId: data.id,
              duongDan: reader.result
            }
            this._apiService.postAnh(bodyAnh).subscribe();
          }

        }
        this._messageService.add({severity:'success', summary: 'Thông báo', detail: 'Đánh giá sản phẩm thành công', life: 3000});
        this.callAPI();
        this.displayDanhGia = false;
    })

  }
}
