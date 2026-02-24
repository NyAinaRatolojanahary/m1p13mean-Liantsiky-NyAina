import { Component, Input } from '@angular/core';
import { TableOneItem } from './table-one.model';
import { NgForOf } from "../../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-table-one',
  imports: [NgForOf],
  templateUrl: './table-one.component.html',
  styleUrl: './table-one.component.css'
})
export class TableOneComponent {
  @Input() tableData: TableOneItem = { header: [], data: [] };
}
