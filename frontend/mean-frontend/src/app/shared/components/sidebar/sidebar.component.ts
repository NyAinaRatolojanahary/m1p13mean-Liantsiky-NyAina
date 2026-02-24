import { Component, Input, AfterViewChecked, Inject, PLATFORM_ID, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule ,isPlatformBrowser} from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarItem } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements AfterViewChecked{
  @Input() menu: SidebarItem[] = [];
  logoUrl: string = 'assets/template/images/logo-full.png';

  private featherLoaded = false;
  
  // Reference to all arrow containers
  @ViewChildren('arrowContainer', { read: ElementRef }) arrowContainers!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggle(item: SidebarItem) {
  item.expanded = !item.expanded;
}
  async ngAfterViewChecked() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Only run once for parent icons
    if (!this.featherLoaded) {
      const feather = await import('feather-icons');
      feather.default.replace();
      this.featherLoaded = true;
    }
  }

  
}