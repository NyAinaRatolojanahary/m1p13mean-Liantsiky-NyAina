import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-table-two',
  imports: [
    CommonModule
  ],
  templateUrl: './table-two.component.html',
  styleUrl: './table-two.component.css'
})
export class TableTwoComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;

}
