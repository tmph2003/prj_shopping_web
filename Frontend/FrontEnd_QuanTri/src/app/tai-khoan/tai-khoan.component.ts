import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tai-khoan',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ConfirmDialogModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './tai-khoan.component.html',
  styleUrl: './tai-khoan.component.css',
  providers: [ApiService, MessageService, ConfirmationService],
})
export class TaiKhoanComponent {
  datas: any[] = [];
  constructor(
    private accountService: ApiService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.accountService.getAll_Account().subscribe((res: any) => {
      this.datas = res;
    });
  }
  deleteAccountById(id: any) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xóa không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteAccountById(id).subscribe((res) => {
          this.getAll();
        });
      },
    });
  }
  addSanPham() {}
}
