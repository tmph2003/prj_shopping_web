import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bai-viet',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './bai-viet.component.html',
  styleUrl: './bai-viet.component.css',
  providers: [ApiService, MessageService, ConfirmationService],
})
export class BaiVietComponent implements OnInit {
  datas: any[] = [];
  constructor(
    private baiVietService: ApiService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.baiVietService.getAll_BaiViet().subscribe((res: any) => {
      this.datas = res;
    });
  }
  deleteBaiVietById(id: any) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.baiVietService.deleteBaiVietById(id).subscribe((res) => {
          this.getAll();
        });
      },
    });
  }
  addSanPham() {}
}
