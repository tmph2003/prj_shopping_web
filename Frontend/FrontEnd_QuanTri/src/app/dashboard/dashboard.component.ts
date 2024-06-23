import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  chartOptions: any;
  loaiSanPhamList = [];
  trangThaiList = [];
  thanhTienTrangThaiList = [];


  doanhThuTheoNgay: any;
  doanhThuTheoThang: any;
  doanhThuTheoNam: any;
  constructor(apiService: ApiService) {
    apiService.get_SoLuongLoaiSanPham().subscribe((datas) => {
      this.loaiSanPhamList = datas;
      this.data = {
        labels: this.loaiSanPhamList.map((item: any) => item.tenLoai),
        datasets: [
          {
            data: this.loaiSanPhamList.map((item: any) => item.tongSoLuong),
            backgroundColor: [
              '#42A5F5',
              '#66BB6A',
              '#FFA726',
              '#AB47BC',
              '#EC407A',
              '#FFCA28',
              '#26A69A',
              '#78909C',
              '#FF7043',
              '#7E57C2',
              '#FFEE58',
              '#26C6DA',
              '#9CCC65',
              '#FF5252',
              '#78909C',
              '#FFA000',
            ],
            hoverBackgroundColor: [
              '#42A5F5',
              '#66BB6A',
              '#FFA726',
              '#AB47BC',
              '#EC407A',
              '#FFCA28',
              '#26A69A',
              '#78909C',
              '#FF7043',
              '#7E57C2',
              '#FFEE58',
              '#26C6DA',
              '#9CCC65',
              '#FF5252',
              '#78909C',
              '#FFA000',
            ],
          },
        ],
      };
    });

    apiService.get_SoLuongTrangThai().subscribe((datas) => {
      this.trangThaiList = datas;
      this.data1 = {
        labels: this.trangThaiList.map((item: any) => item.trangThai),
        datasets: [
          {
            data: this.trangThaiList.map((item: any) => item.count),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
            hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
          },
        ],
      };
    });

    apiService.get_ThanhTienTrangThai().subscribe((datas) => {
      this.thanhTienTrangThaiList = datas;
      this.data2 = {
        labels: this.thanhTienTrangThaiList.map((item: any) => item.trangThai),
        datasets: [
          {
            label: 'Tổng số tiền',
            backgroundColor: '#42A5F5',
            data: this.thanhTienTrangThaiList.map(
              (item: any) => item.thanhTien
            ),
          },
        ],
      };
    });


    /////
    apiService.getDoanhThuTheoNgay().subscribe((datas) => {
      this.doanhThuTheoNgay = datas;
      console.log(datas);


      const getLast7Days = () => {
        const result = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          result.push(formatDate(date, 'dd/MM/yyyy', 'en-US'));  // Format date as needed
        }
        return result;
      };

      // Get the last 7 days
      const last7Days = getLast7Days();
      this.data3 = {
        labels: last7Days,
        datasets: [
          {
            label: 'Doanh thu',
            data: this.doanhThuTheoNgay.map((item: any) => item.tongThanhTien),
            // backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
            // hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
          },
        ],
      };
    });

    apiService.getDoanhThuTheoNam().subscribe((datas) => {
      this.doanhThuTheoNam = datas;
      const date = new Date();

      // Get the last 7 days
      const last4Year = [date.getFullYear() - 3,date.getFullYear() - 2,date.getFullYear() - 1,date.getFullYear()];
      this.data5 = {
        labels: last4Year,
        datasets: [
          {
            label: 'Doanh thu',
            data: this.doanhThuTheoNam.map((item: any) => item.tongThanhTien),
            // backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
            // hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
          },
        ],
      };
    });

    apiService.getDoanhThuTheoThang().subscribe((datas) => {
      this.doanhThuTheoThang = datas;
      const date = new Date();

      // Get the last 7 days
      const month12 = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ];
      this.data4 = {
        labels: month12,
        datasets: [
          {
            label: 'Doanh thu',
            data: this.doanhThuTheoThang.map((item: any) => item.tongThanhTien),
            // backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
            // hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
          },
        ],
      };
    });
  }
}
