import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-one',
  imports: [
    CommonModule
  ],
  templateUrl: './table-one.component.html',
  styleUrl: './table-one.component.css',

})
export class TableOneComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  // pagination inputs
  @Input() page = 1;
  @Input() totalPages = 1;
  @Input() action :string = 'Edit';


  // notify parent when page changes pagination
  @Output() pageChange = new EventEmitter<number>();

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.pageChange.emit(p);
  }

  //action button click
  @Output() actionClick = new EventEmitter<any>();

  onActionClick(row: any) {
    this.actionClick.emit(row);
  }
}
