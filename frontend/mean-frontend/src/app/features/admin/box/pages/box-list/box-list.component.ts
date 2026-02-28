import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';
import { BoxService } from '../../services/box.service';
import { Router} from '@angular/router';
import { Box } from '../../models/box.model';


@Component({
  selector: 'app-box-list',
  imports: [CommonModule,TableOneComponent],
  templateUrl: './box-list.component.html',
  styleUrl: './box-list.component.css'
})
export class BoxListComponent implements OnInit{
  //inputs
  boxes : any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Superficie (m2)', field: 'espacem2' },
    { header: 'Loyer (AR)', field: 'loyer' },
    { header: 'Etage', field: 'nom' },
  ];
  action = 'Change Loyer';

  page = 1;
  totalPages = 1;
  limit = 2;

  constructor(
    private boxService: BoxService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.loading = false;

    this.boxService
      .getAllPaginated(this.page, this.limit)
      .subscribe(res => {
        this.boxes = res.data;
        this.totalPages = res.pagination.totalPages;
        this.page = res.pagination.page;
        this.loading = false;
      });
  }

  goToChangeLoyer(box: any) {
    console.log('Go to change loyer for box', box);
    this.router.navigate(['/admin/box-loyer/', box._id]);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadData();
  }
}
