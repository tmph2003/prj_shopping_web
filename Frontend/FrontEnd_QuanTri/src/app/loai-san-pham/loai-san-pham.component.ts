import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loai-san-pham',
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
  templateUrl: './loai-san-pham.component.html',
  styleUrl: './loai-san-pham.component.css',
  providers: [ApiService, MessageService, ConfirmationService],
})
export class LoaiSanPhamComponent {
  datas: any[] = [];
  constructor(
    private loaiSanPhamService: ApiService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.loaiSanPhamService.getAll_LoaiSanPham().subscribe((res: any) => {
      this.datas = res;
    });
  }
  deleteLoaiSanPhamById(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loaiSanPhamService.deleteLoaiSanPhamById(id).subscribe((res) => {
          this.getAll();
        });
      },
    });
  }
  addSanPham() {}
}
