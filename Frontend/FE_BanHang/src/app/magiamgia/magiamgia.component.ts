import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-magiamgia',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ToastModule
  ],
  providers:[
    ApiService,
    MessageService
  ],
  templateUrl: './magiamgia.component.html',
  styleUrl: './magiamgia.component.css'
})
export class MagiamgiaComponent {
  listItemMa: any;
  listItemMaDaLuu: any;
  account: any;
  constructor(
    private _apiService: ApiService,
    public messageService: MessageService,
    private storage : StorageMap
  ){
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
        {
          this.callApi();
        }
      }
    );
  }
  ngOnInit(): void {

  }

  callApi(): void{
    this._apiService.getMaGiamGiaConLai(this.account.id).subscribe(magiamgia =>
      {
        this.listItemMa = magiamgia;
      }
      )
      this._apiService.getMaGiamGiaDaLuu(this.account.id).subscribe(magiamgia =>
        {
          this.listItemMaDaLuu = magiamgia;
        }
      )
  }

  themMa(id: string): void{
    const body = {
      magiamgiaId: id,
      accountId: this.account.id
    }
      this._apiService.postAccountMaGiamGia(body).subscribe(magiamgia => {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Lưu mã giảm giá thành công', life: 3000});
        this.callApi();
      })
  }
}
