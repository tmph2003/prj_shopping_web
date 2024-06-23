import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SlideBarService {
  private _sidebarVisible = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this._sidebarVisible.asObservable();

  constructor() { }

  toggleSidebar() {
    this._sidebarVisible.next(!this._sidebarVisible.value);
  }
}
