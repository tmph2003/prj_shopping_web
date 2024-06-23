import { Component, Pipe, PipeTransform } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DangnhapService } from '../dangnhap.service';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CommonModule } from '@angular/common';
import {InputSwitchModule} from 'primeng/inputswitch';
import { DonhangGiohangService } from '../donhang-giohang.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {ProgressBarModule} from 'primeng/progressbar';


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
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    RadioButtonModule,
    CommonModule,
    FormsModule,
    CommonModule,
    ConfirmDialogModule,
    FormatVndPipe,
    DialogModule,
    RouterOutlet,
    RouterModule,
    InputSwitchModule,
    ProgressBarModule
  ],
  providers: [
    ApiService,
    DangnhapService,
    DonhangGiohangService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './thanhtoan.component.html',
  styleUrl: './thanhtoan.component.css'
})
export class ThanhtoanComponent {
  selectedValuedc: any;
  maGiamGiaID: any;
  maGiam: any;
  luongGiam: any = 0;
  phuongThucVanChuyen: any;
  phiVanChuyen: any = 0;
  ghiChu: any;
  phuongThucThanhToan: any;
  idDonHang: any;
  showQR = false;
  imgQR: any;
  minutes: number = 10;
  seconds: number = 0;
  intervalId: any;
  display = false;


  listSanPham: any;
  tongTien: any;
  thanhToan: any;
  isDungDiaChiKhac = false;
  customDiaChi = "";
  diachi: any;
  account: any;
  magiamgia: any;
  rqDC: any;
  rqPTTT: any;
  rqPTVC: any;

  constructor(
    public _dangNhapService: DangnhapService,
    public _apiService: ApiService,
    public messageService: MessageService,
    private storage : StorageMap,
    public router: Router,
    private confirmationService: ConfirmationService
  ) {
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
          this.callAPI();
        this.thanhToan = this.tongTien;
      }
    );
    this.listSanPham = DonhangGiohangService.listSanPham;
    this.tongTien = DonhangGiohangService.tongTien;
    this.ghiChu = DonhangGiohangService.ghiChu;

  }

  callAPI(): void{
    this._apiService.getDiaChiByIdUser(this.account.id).subscribe(data => {
      this.diachi = data;
    })
    this._apiService.getMaGiamGiaByAccount(this.account.id).subscribe(data => {
      this.magiamgia = data;
      console.log(this.magiamgia);
    })
    // this._apiService.getAccountById(this.account.id).subscribe(data =>{
    //   this.account = data;
    // })
  }

  dungMaGiam(id: any, maGiam: any, luongGiam: any): void{
    this.luongGiam = luongGiam;
    this.maGiam = maGiam;
    this.maGiamGiaID = id;
    this.thayDoiTong();
  }

  convertDateToString(inputDate: string): string {
    // Tách chuỗi ngày giờ thành các phần
    const parts = inputDate.split(' ');

    if (parts.length !== 2) {
      throw new Error('Invalid date format');
    }

    const timePart = parts[0]; // Phần thời gian "23:46:10"
    const datePart = parts[1]; // Phần ngày tháng "21/6/2024"

    // Chuyển đổi phần thời gian "23:46:10" thành "233052"
    const timeWithoutColon = timePart.replace(/:/g, '');

    // Chuyển đổi phần ngày tháng "21/6/2024" thành "2162024"
    const dateWithoutSlash = datePart.replace(/\//g, '');

    // Kết hợp lại thành chuỗi kết quả "233052 2162024"
    const result = `${timeWithoutColon} ${dateWithoutSlash}`;

    return result;
  }

  hoanTatDonHang(): void{
    // if(this.phuongThucVanChuyen == 'Vận chuyển thường')
    //   this.phiVanChuyen = 25000;
    // else if(this.phuongThucVanChuyen == "Vận chuyển siêu tốc")
    //   this.phiVanChuyen = 40000;
    let checkRQ = false
    if(!this.isDungDiaChiKhac && this.selectedValuedc == null)
    {
      this.rqDC = 'Vui lòng không để trống địa chỉ giao hàng';
      checkRQ = true;
    }
    else
    this.rqDC = null;
    if(this.isDungDiaChiKhac && (this.customDiaChi == null || this.customDiaChi == ""))
    {
      this.rqDC = 'Vui lòng không để trống địa chỉ giao hàng';
      checkRQ = true;
    }
    else if(this.isDungDiaChiKhac)
    this.rqDC = null;
    if(this.phuongThucVanChuyen == null)
    {
      this.rqPTVC = 'Vui lòng chọn phương thức vận chuyển';
      checkRQ = true;
    }
    else
    this.rqPTVC = null
    if(this.phuongThucThanhToan == null)
    {
      this.rqPTTT = 'Vui lòng chọn phương thức thanh toán';
      checkRQ = true;
    }
    else
    this.rqPTTT = null;
    if(checkRQ)
    {
      return;
    }

    if(this.phuongThucThanhToan == 'Thanh toán bằng mã QR')
    {
      this.showQR = true;
      let thanhTien = this.tongTien * (1-this.luongGiam/100) + parseInt(this.phiVanChuyen);
      const currentDate = new Date();
      this.imgQR = `https://img.vietqr.io/image/970422-0328689795-compact2.png?amount=${thanhTien}&addInfo=Thanh toan don hang ${currentDate.toLocaleString()}`;
      this.minutes = 10;
      this.seconds = 0;
      clearInterval(this.intervalId);
      this.startCountdown();
      setTimeout(() => {
        var newInterval = setInterval(() => {
          if(this.showQR == false)
          {
            clearInterval(newInterval);
            return;
          }
          this._apiService.getThanhToan().subscribe(data => {
            if(data.data[data.data.length - 1]["Giá trị"] >= this.thanhToan && data.data[data.data.length - 1]["Mô tả"] == `Thanh toan don hang ${this.convertDateToString(currentDate.toLocaleString())}`)
              {
                clearInterval(newInterval);
                this.display = true;
                DangnhapService.soSPTrongGioSubject.next(0);
                const body = {
                  accountId: this.account.id,
                  maGiamGiaId: this.maGiamGiaID,
                  thanhTien: this.tongTien * (1-this.luongGiam/100) + parseInt(this.phiVanChuyen),
                  diaChi: this.isDungDiaChiKhac? this.customDiaChi : this.selectedValuedc,
                  ghiChu: this.ghiChu,
                  phuongThucVanChuyen: this.phuongThucVanChuyen,
                  phuongThucThanhToan: this.phuongThucThanhToan,
                  trangThai: "Chờ xác nhận đơn hàng",
                }
                this.acceptDonHang(body);
              }
          });
        }, 5000)
      }, 10000);
      return;
    }

    const body = {
      accountId: this.account.id,
      maGiamGiaId: this.maGiamGiaID,
      thanhTien: this.tongTien * (1-this.luongGiam/100) + parseInt(this.phiVanChuyen),
      diaChi: this.isDungDiaChiKhac? this.customDiaChi : this.selectedValuedc,
      ghiChu: this.ghiChu,
      phuongThucVanChuyen: this.phuongThucVanChuyen,
      phuongThucThanhToan: this.phuongThucThanhToan,
      trangThai: "Chờ xác nhận đơn hàng",
    }
    this.confirmationService.confirm({
      message: 'Xác nhận đặt đơn hàng này?',
      accept: async () => {
       this.acceptDonHang(body);
      }
    });



  }

  acceptDonHang(body: any){
    this._apiService.postDonHang(body).subscribe(data => {
      this.idDonHang = data.id;
      for(let i =  0; i < this.listSanPham.length; i++)
      {
        const body2 = {
          sanPhamId: this.listSanPham[i].sanPham_id,
          donHangId: this.idDonHang,
          soLuong: this.listSanPham[i].soLuong,
          kichCo: this.listSanPham[i].kichCo,
          mau: this.listSanPham[i].mau,
        }
        this._apiService.postSanPhamDonHang(body2).subscribe();
      }
      if(this.maGiamGiaID)
      this._apiService.xoaAccountMaGiamGia(this.maGiamGiaID, this.account.id).subscribe();
    });

    this._apiService.xoaSanPhamTrongGio(this.account.id).subscribe();
    this.display = true;
    DangnhapService.soSPTrongGioSubject.next(0);
    setTimeout(() => {
      this.router.navigate(['/donhang']);
    }, 3000);
  }

  thayDoiTong(): void{
    if(this.phuongThucVanChuyen == 'Vận chuyển thường')
      this.phiVanChuyen = 25000;
    else if(this.phuongThucVanChuyen == "Vận chuyển siêu tốc")
      this.phiVanChuyen = 40000;
    if(this.phiVanChuyen > 0)
      this.thanhToan = this.tongTien * (1 - this.luongGiam/100) + this.phiVanChuyen;
    else
      this.thanhToan = this.tongTien * (1 - this.luongGiam/100);
  }

  startCountdown(): void {

    let totalTime = this.minutes * 60 + this.seconds;
    this.updateCountdownDisplay(totalTime);

    this.intervalId = setInterval(() => {
      if (totalTime > 0) {
        totalTime--;
        this.updateCountdownDisplay(totalTime);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  updateCountdownDisplay(totalTime: number): void {
    this.minutes = Math.floor(totalTime / 60);
    this.seconds = totalTime % 60;
  }
}
