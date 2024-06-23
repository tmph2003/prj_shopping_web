import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-don-hang',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, HttpClientModule, ToastModule],
  templateUrl: './don-hang.component.html',
  styleUrl: './don-hang.component.css',
  providers: [ApiService,
    MessageService
  ],
})
export class DonHangComponent {
  datas: any[] = [];
  constructor(private donHangService: ApiService, private _messageService: MessageService,) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.donHangService.getAll_DonHang().subscribe((res: any) => {
      this.datas = res;
    });
  }

  changeTrangThai(trangThai: any, body: any){
    body.trangThai = trangThai;
    this.donHangService.putTrangThaiDonHang(body.id,body).subscribe(data => {
      this.getAll();
      this._messageService.add({severity:'success', summary: 'Thông báo', detail: 'Thay đổi trạng thái đơn hàng thành công', life: 3000});
    })
  }
}
