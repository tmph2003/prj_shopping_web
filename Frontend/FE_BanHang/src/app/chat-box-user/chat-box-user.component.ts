import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-chat-box-user',
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
  templateUrl: './chat-box-user.component.html',
  styleUrl: './chat-box-user.component.css'
})
export class ChatBoxUserComponent {

  listMessage: any;
  account: any;
  currentChat: any;

  constructor(
    public _apiService: ApiService,
    private storage : StorageMap
  ) {
    this.callApi();
  }

  callApi() {
    const storedValueAccount = this.storage.get('account').subscribe(data =>
    {
      this.account = data;
      if(this.account)
      {
        this._apiService.getChatBoxFromUser(this.account.id).subscribe(rs => {
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
        accountId: this.account.id,
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
