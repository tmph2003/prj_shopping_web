import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-baiviet',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  templateUrl: './baiviet.component.html',
  styleUrl: './baiviet.component.css'
})
export class BaivietComponent {
    baivietHtml: SafeHtml = "";
    id = "";

    constructor(
      private route: ActivatedRoute,
      private sanitizer : DomSanitizer,
      private _apiService: ApiService,
      ){
        this.route.params.subscribe(params => {
          const id = params['id'];
          if (id !== null && id !== "") {
            this.id = id;

             this._apiService.getBaiVietByID(this.id).then(baiviet => {
             this.baivietHtml = this.sanitizer.bypassSecurityTrustHtml(baiviet.noiDung);

             })
          }
        });
    }

    ngOnInit(): void {

    }
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.

    }
}
