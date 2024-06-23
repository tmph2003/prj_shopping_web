import { Component, OnInit } from '@angular/core';
import { SlideBarService } from '../side-nav/slide-bar.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: SlideBarService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
