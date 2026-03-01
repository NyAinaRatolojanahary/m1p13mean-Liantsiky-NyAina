import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';

@Component({
  selector: 'app-categorie-list',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TableOneComponent
  ],
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  constructor(
    private categorieService: CategorieService,
    private router : Router
  ) { }

  categories: any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Image', field: 'image' }
  ];
  page = 1;
  totalPages = 1;
  limit = 2;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = false;

    this.categorieService
      .getAllPaginated(this.page, this.limit)
      .subscribe(res => {
        this.categories = res.data;
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
