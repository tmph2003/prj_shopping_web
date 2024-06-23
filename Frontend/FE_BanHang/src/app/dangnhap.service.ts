import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DangnhapService {

  public static account: any;
  public static isDangNhap = false;
  public static soSPTrongGioSubject = new BehaviorSubject<number>(0);
  public static soSPTrongGio$ = DangnhapService.soSPTrongGioSubject.asObservable();

  static dataSubject: Subject<boolean> = new Subject<boolean>();
  static dataSubjectAccount: Subject<any> = new Subject<any>();
  static dataSubjectSL: Subject<any> = new Subject<any>();
  constructor(private storage : StorageMap) {
    const storedValue = storage.get('isDangNhap').subscribe(data =>
      {
        if(typeof(data) == 'boolean')
        DangnhapService.isDangNhap = data;
      }
    );
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        DangnhapService.account = data;
      }
    );
    //DangnhapService.isDangNhap = storedValue ? JSON.parse(storedValue) : null;
  }

  static setSoSPTrongGio(value: number) {
    DangnhapService.soSPTrongGioSubject.next(value);
  }

  updateData(newData: boolean, newDataAccount: any) {
    DangnhapService.dataSubject.next(newData); // Phát ra sự kiện với trạng thái mới
    DangnhapService.dataSubjectAccount.next(newDataAccount);
    DangnhapService.isDangNhap = newData;
    DangnhapService.account = newDataAccount;
    this.storage.set('isDangNhap', newData).subscribe(() => {});
    this.storage.set('account', newDataAccount).subscribe(() => {});
  }

  setAccount(account: any): void{
    DangnhapService.account = account;
    this.updateData(true, account);
  }

  dangXuat():void{
    DangnhapService.account = null;
    this.updateData(false, null);
  }

  updateSLGio(sl: any): void{
    this.storage.set('sol', sl).subscribe(() => {});
  }

}
