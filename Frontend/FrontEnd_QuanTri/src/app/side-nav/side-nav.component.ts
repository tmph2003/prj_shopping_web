import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBarService } from './slide-bar.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  constructor(private slidebarService: SlideBarService) {}

  ngOnInit(): void {
    this.slidebarService.sidebarVisible$.subscribe((visible) => {
      this.sidebarVisible = visible;
    });
  }
}
