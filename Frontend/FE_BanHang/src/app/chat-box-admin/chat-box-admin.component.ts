import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../api.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-chat-box-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextModule
  ],
  providers: [
    ApiService
  ],
  templateUrl: './chat-box-admin.component.html',
  styleUrl: './chat-box-admin.component.css'
})
export class ChatBoxAdminComponent {
  listMessage: any;
  account: any; // account này là account hiện tại nghĩa là admin
  currentChat: any;
  idUser: any; //id user cần support
  accountUser: any;

  constructor(
    public _apiService: ApiService,
    private route: ActivatedRoute,
    private storage : StorageMap
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idUser = id;
      this._apiService.getAccountById(id).subscribe(data => {
        this.accountUser = data;
        this.callApi();
      })

    });

  }

  callApi() {
    const storedValueAccount = this.storage.get('account').subscribe(data =>
    {
      this.account = data;
      if(this.account)
      {
        this._apiService.getChatBoxFromUser(this.accountUser.id).subscribe(rs => {
          this.listMessage = rs;
        })
      }
    })
  }

  sendMessage(event: KeyboardEvent){
    if (event.key === "Enter") {
      if(!this.currentChat)
        return;
      const body = {
        adminId: "1D9E7E30-D559-40E7-B3EE-6238954DBE1C",
        accountId: this.idUser,
        noiDung: this.currentChat,
        nguoiGuiId: this.account.id,
      }
      this._apiService.postMessage(body).subscribe(data => {
        this.currentChat = "";
        this.callApi();
      });
    }

  }
}
