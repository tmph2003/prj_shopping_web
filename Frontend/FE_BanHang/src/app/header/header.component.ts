import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DangnhapService } from '../dangnhap.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    DangnhapService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  account: any;
  isDangNhap = false;
  isAccount = false;
  isAdmin = false;
  searchKey: any;
  soSPTrongGio = 0;
  private subscription: Subscription = new Subscription();

  private static subscription: Subscription;
  constructor(
    public router: Router,
    public _dangNhapService: DangnhapService,
    private storage : StorageMap
  ){
    const storedValue = storage.get('isDangNhap').subscribe(data =>
      {
        if(typeof(data) == 'boolean')
        this.isDangNhap = data;
      }
    );
    const storedValueAccount = storage.get('account').subscribe(data =>
      {
        this.account = data;
        if(this.account)
        {
          if(this.account.vaiTro == false)
            this.isAccount = true
          else
            this.isAccount = false
          if(this.account.vaiTro == true)
            this.isAdmin = true
          else
            this.isAdmin = false
        }
      }
    );
    const storedValueSLGio = storage.get('sol').subscribe(data =>
      {
        if(typeof(data) == "number")
        this.soSPTrongGio = data;
      }
    );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    HeaderComponent.subscription = DangnhapService.dataSubject.subscribe((value: any) => {
      this.isDangNhap = value;
      if(this.account.vaiTro == false)
        this.isAccount = true
      else
        this.isAccount = false
      if(this.account.vaiTro == true)
        this.isAdmin = true
      else
        this.isAdmin = false
    });
    HeaderComponent.subscription = DangnhapService.dataSubjectAccount.subscribe((value: any) => {
      this.account = value;
      if(this.account.vaiTro == false)
        this.isAccount = true
      else
        this.isAccount = false
      if(this.account.vaiTro == true)
        this.isAdmin = true
      else
        this.isAdmin = false
    });
    HeaderComponent.subscription = DangnhapService.dataSubjectSL.subscribe((value: any) => {
      this.soSPTrongGio = value;
    });
    this.subscription = DangnhapService.soSPTrongGio$.subscribe(value => {
      this.soSPTrongGio = value;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Thực hiện các hành động khi cuộn chuột
    this.changeHeader()
    // Gọi các hàm xử lý hoặc gửi sự kiện đến component
  }

  dangXuat(): void{
    this._dangNhapService.dangXuat();
      DangnhapService.soSPTrongGioSubject.next(0);
    this.router.navigate(['/login']);
  }

  changeHeader(): void{
    var scrollPosition = document.documentElement.scrollTop;
    var objHeader = document.getElementById('xh_menu');
    var iconHeader = document.getElementById('icon_hide');
    var accountMG = document.getElementById('accountmg');
    if(objHeader != null)
    {
      if(scrollPosition > 0)
      {
          objHeader.style.height= '0';
          objHeader.style.padding= '0px';
          objHeader.style.overflow="hidden";
          if(iconHeader)
          {
            iconHeader.style.height= '0';
            iconHeader.style.marginBottom= '0px';
            iconHeader.style.overflow="hidden";
          }
          if(accountMG)
          {
            accountMG.style.marginTop= '10px';
          }
      }
      else
      {
          objHeader.style.padding= '10px';
          objHeader.style.height = '97px';
          objHeader.style.overflow="unset";
          if(iconHeader)
          {
            iconHeader.style.height= '36px';
            iconHeader.style.marginBottom= '25px';
            iconHeader.style.overflow="unset";
          }
          if(accountMG)
          {
            accountMG.style.marginTop= '16px';
          }
      }
    }
  }

  timSP(event: KeyboardEvent){
    if (event.key === "Enter") {
      this.timKiem();
    }
  }
  timKiem(): void{
    if(this.searchKey != null && this.searchKey != "")
    {
      this.router.navigate([`/TimKiemSanPham/${this.searchKey}`])
    }
  }
}
