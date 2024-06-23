import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../api.service';
import {ProgressBarModule} from 'primeng/progressbar';

@Component({
  selector: 'app-chat-box-admin-list-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ProgressBarModule
  ],
  providers: [
    ApiService
  ],
  templateUrl: './chat-box-admin-list-user.component.html',
  styleUrl: './chat-box-admin-list-user.component.css'
})
export class ChatBoxAdminListUserComponent {

  listUser: any;

  constructor(
    public _apiService: ApiService,
  ){
    this._apiService.getListUserForAdminSupport().subscribe(data => {
      this.listUser = data;
    })
  }
}
