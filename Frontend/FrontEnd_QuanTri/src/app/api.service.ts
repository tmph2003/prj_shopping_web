import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const urlAnhSanPham = 'http://localhost:8088/api/AnhSanPhams',
  urlSanPham = 'http://localhost:8088/api/SanPhams',
  urlLoaiSanPham = 'http://localhost:8088/api/LoaiSanPhams',
  urlDonHang = 'http://localhost:8088/api/DonHangs',
  urlAccount = 'http://localhost:8088/api/Accounts',
  urlBaiViet = 'http://localhost:8088/api/BaiViets',
  urlGopY = 'http://localhost:8088/api/Gopies',
  urlMaGiamGia = 'http://localhost:8088/api/MaGiamGiums';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //=================AnhSanPham=================
  constructor(private http: HttpClient) {}
  getAll_AnhSanPham(): Observable<any> {
    return this.http.get<any[]>(urlAnhSanPham).pipe();
  }
  getAnhSanPhamById(id: any): Observable<any> {
    return this.http.get<any[]>(`${urlAnhSanPham}/${id}`);
  }
  deleteAnhSanPhamById(id: any): Observable<any> {
    return this.http.delete<any[]>(`${urlAnhSanPham}/${id}`);
  }
  post_AnhSanPham(body: any): Observable<any> {
    return this.http.post(urlAnhSanPham, body, this.httpOptions);
  }
  put_AnhSanPham(id: any, body: any): Observable<any> {
    return this.http.put(`${urlAnhSanPham}/${id}`, body, this.httpOptions);
  }
  //=================SanPham=================
  getAll_SanPham(): Observable<any> {
    return this.http.get<any[]>(urlSanPham).pipe();
  }
  post_SanPham(body: any): Observable<any> {
    return this.http.post(urlSanPham, body, this.httpOptions);
  }
  put_SanPham(id: any, body: any): Observable<any> {
    return this.http.put(`${urlSanPham}/${id}`, body, this.httpOptions);
  }
  getSanPhamById(id: any): Observable<any> {
    return this.http.get(`${urlSanPham}/${id}`);
  }
  deleteSanPhamById(id: any): Observable<any> {
    return this.http.delete<any[]>(`${urlSanPham}/${id}`);
  }
  //Check ma san pham
  checkMaSanPham(masanpham: any): Observable<any> {
    return this.http.get(`${urlSanPham}/checkMaSanPham/${masanpham}`);
  }

  //=================LoaiSanPham=================
  getAll_LoaiSanPham(): Observable<any> {
    return this.http.get<any[]>(urlLoaiSanPham).pipe();
  }
  getLoaiSanPhamById(id: any): Observable<any> {
    return this.http.get<any[]>(`${urlLoaiSanPham}/${id}`);
  }
  deleteLoaiSanPhamById(id: any): Observable<any> {
    return this.http.delete<any[]>(`${urlLoaiSanPham}/${id}`);
  }
  post_LoaiSanPham(body: any): Observable<any> {
    return this.http.post(urlLoaiSanPham, body, this.httpOptions);
  }
  put_LoaiSanPham(id: any, body: any): Observable<any> {
    return this.http.put(`${urlLoaiSanPham}/${id}`, body, this.httpOptions);
  }
  get_SoLuongLoaiSanPham(): Observable<any> {
    return this.http.get(
      `${urlLoaiSanPham}/GetSoLuongLoaiSanPham`,
      this.httpOptions
    );
  }
  //=================DonHang=================
  getAll_DonHang(): Observable<any> {
    return this.http.get<any[]>(urlDonHang).pipe();
  }
  get_SoLuongTrangThai(): Observable<any> {
    return this.http
      .get<any[]>(`${urlDonHang}/GetSoLuongTrangThaiDonHang`)
      .pipe();
  }
  get_ThanhTienTrangThai(): Observable<any> {
    return this.http
      .get<any[]>(`${urlDonHang}/GetThanhTienTrangThaiDonHang`)
      .pipe();
  }

  getDoanhThuTheoNgay(): Observable<any> {
    return this.http.get<any[]>(`${urlDonHang}/getdoanhthutheongay`);
  }

  getDoanhThuTheoThang(): Observable<any> {
    return this.http.get(`${urlDonHang}/getdoanhthutheothang`);
  }

  getDoanhThuTheoNam(): Observable<any> {
    return this.http.get<any[]>(`${urlDonHang}/getdoanhthutheonam`);
  }
  //=================Account=================
  getAll_Account(): Observable<any> {
    return this.http.get<any[]>(urlAccount).pipe();
  }
  getAccountById(id: any): Observable<any> {
    return this.http.get<any[]>(`${urlAccount}/${id}`);
  }
  deleteAccountById(id: any): Observable<any> {
    return this.http.delete<any[]>(`${urlAccount}/${id}`);
  }
  post_Account(body: any): Observable<any> {
    return this.http.post(urlAccount, body, this.httpOptions);
  }
  put_Account(id: any, body: any): Observable<any> {
    return this.http.put(`${urlAccount}/${id}`, body, this.httpOptions);
  }
  //=================BaiViet=================
  getAll_BaiViet(): Observable<any> {
    return this.http.get<any[]>(urlBaiViet).pipe();
  }
  deleteBaiVietById(id: any): Observable<any> {
    return this.http.delete<any[]>(`${urlBaiViet}/${id}`);
  }
  //=================GopY=================
  getAll_GopY(): Observable<any> {
    return this.http.get<any[]>(urlGopY).pipe();
  }
  //=================MaGiamGia=================
  getAll_MaGiamGia(): Observable<any> {
    return this.http.get<any[]>(urlMaGiamGia).pipe();
  }
  getMaGiamGiaById(id: any): Observable<any> {
    return this.http.get(`${urlMaGiamGia}/${id}`);
  }
  post_MaGiamGia(body: any): Observable<any> {
    return this.http.post(urlMaGiamGia, body, this.httpOptions);
  }
  put_MaGiamGia(id: any, body: any): Observable<any> {
    return this.http.put(`${urlMaGiamGia}/${id}`, body, this.httpOptions);
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    return this.http.post<any>(`${urlAnhSanPham}/upload`, formData);
  }

  putTrangThaiDonHang(id: any, body: any): Observable<any> {
    return this.http.put(`${urlDonHang}/${id}`, body, this.httpOptions);
  }
}
