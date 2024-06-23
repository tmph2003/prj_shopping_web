import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DangnhapService } from './dangnhap.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginPage implements CanActivate {

  isDangNhap = false;
  constructor(
    private router: Router,
    private storage : StorageMap
  ) {}

  canActivate(): boolean {
    // Kiểm tra điều kiện ở đây (trong trường hợp này, biến A)
    const storedValue = this.storage.get('isDangNhap').subscribe(data =>
      {
        if(typeof(data) == 'boolean')
        this.isDangNhap = data;
        if (this.isDangNhap) {
          // Nếu điều kiện không được đáp ứng, chuyển hướng đến trang đăng nhập
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }
    );
    return true;
  }
}
