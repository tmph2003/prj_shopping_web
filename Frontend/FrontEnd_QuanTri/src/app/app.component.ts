import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SlideBarService } from './side-nav/slide-bar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideNavComponent,
    RouterLink,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = false;

  constructor(private sidebarService: SlideBarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.sidebarVisible = visible;
    });
  }
}
