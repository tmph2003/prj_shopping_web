import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gop-y',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, HttpClientModule],
  templateUrl: './gop-y.component.html',
  styleUrl: './gop-y.component.css',
})
export class GopYComponent {
  datas: any[] = [];
  constructor(private sanPhamService: ApiService) {}
  ngOnInit(): void {
    this.getAll();
    console.log(this.getAll());
  }
  getAll() {
    this.sanPhamService.getAll_GopY().subscribe((res: any) => {
      this.datas = res;
    });
  }
}
