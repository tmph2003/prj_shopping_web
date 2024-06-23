import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ma-giam-gia',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './ma-giam-gia.component.html',
  styleUrl: './ma-giam-gia.component.css',
})
export class MaGiamGiaComponent {
  datas: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.apiService.getAll_MaGiamGia().subscribe((res: any) => {
      this.datas = res;
    });
  }
}
