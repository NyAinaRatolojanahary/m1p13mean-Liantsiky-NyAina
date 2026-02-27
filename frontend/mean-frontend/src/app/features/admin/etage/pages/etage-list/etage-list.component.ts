import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component'; 
import { EtageService } from '../../services/etage.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-etage-list',
  standalone: true,
  imports: [CommonModule, TableOneComponent],
  templateUrl: './etage-list.component.html'
})
export class EtageListComponent implements OnInit {
  etages: any[] = [];
  loading = false;
    
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Nombre de box', field: 'nombreBox' }
  ];

  page = 1;
  totalPages = 1;
  limit = 2;


  constructor(
    private etageService: EtageService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.loading = false;

    this.etageService
      .getAllPaginated(this.page, this.limit)
      .subscribe(res => {
        this.etages = res.data;
        this.totalPages = res.pagination.totalPages;
        this.page = res.pagination.page;
        this.loading = false;
      });
      
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadData();
  }

}