import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-anh-san-pham',
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
  templateUrl: './anh-san-pham.component.html',
  styleUrl: './anh-san-pham.component.css',
  providers: [ApiService, MessageService, ConfirmationService],
})
export class AnhSanPhamComponent implements OnInit {
  datas: any[] = [];
  constructor(
    private anhSanPhamService: ApiService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.anhSanPhamService.getAll_AnhSanPham().subscribe((res: any) => {
      this.datas = res;
    });
  }
  deleteAnhSanPhamById(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.anhSanPhamService.deleteAnhSanPhamById(id).subscribe((res) => {
          this.getAll();
        });
      },
    });
  }
  addAnhSanPham() {}
}
