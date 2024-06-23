import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DangnhapService } from '../dangnhap.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    CommonModule
  ],
  providers: [
    ApiService,
    MessageService,
    DangnhapService
  ],
  templateUrl: './dangnhap.component.html',
  styleUrl: './dangnhap.component.css'
})
export class DangnhapComponent {
  tendangnhap: string = "";
  matkhau: string = "";
  isDangNhap = false;
  private dataSubscription!: Subscription;
  constructor(
    public _apiService: ApiService,
    public messageService: MessageService,
    private _dangNhapService: DangnhapService,
    public router: Router,
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  solveDangNhap(): void{
    this._apiService.getAccountByAuth(this.tendangnhap, this.matkhau).subscribe(rq => {
      if(rq.status == "success")
      {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Đăng nhập thành công', life: 3000});
        this._dangNhapService.setAccount(rq.accounts)
        this._apiService.getSoLuongTrongGio(rq.accounts.id).subscribe(ans => {
          DangnhapService.soSPTrongGioSubject.next(ans);
        })
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);


      }
      else
      {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Thông tin tài khoản hoặc mật khẩu không chính xác', life: 3000});
      }
    })
  }
}
