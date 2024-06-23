import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-san-pham',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './san-pham.component.html',
  styleUrl: './san-pham.component.css',
  providers: [ApiService, MessageService, ConfirmationService],
})
export class SanPhamComponent implements OnInit {
  datas: any[] = [];
  constructor(
    private sanPhamService: ApiService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.sanPhamService.getAll_SanPham().subscribe((res: any) => {
      this.datas = res;
    });
  }
  deleteSanPhamById(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sanPhamService.deleteSanPhamById(id).subscribe((res) => {
          this.getAll();
        });
      },
    });
  }
}
