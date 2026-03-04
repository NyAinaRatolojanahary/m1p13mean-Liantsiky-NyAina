import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ADMIN_MENU } from '../admin-sidebar.config';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet,FooterComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  menu = ADMIN_MENU;
}