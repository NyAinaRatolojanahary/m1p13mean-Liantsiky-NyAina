import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';
import { ShopUserService } from '../../services/shop-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-user-list',
  imports: [CommonModule,TableOneComponent],
  templateUrl: './shop-user-list.component.html',
  styleUrl: './shop-user-list.component.css'
})
export class ShopUserListComponent implements OnInit{
  shopUsers : any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Prénom', field: 'prenom' },
    { header: 'Email', field: 'email' }
  ];
  page = 1;
  limit = 2;
  totalPages = 1;

  constructor(
    private shopUserService: ShopUserService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.loading = false;
    this.shopUserService
      .getShopUsersPaginated(this.page, this.limit)
      .subscribe(res => {
        this.shopUsers = res.data;
        this.totalPages = res.pagination.totalPages;
        this.page = res.pagination.page;
        this.loading = false;
      });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadData();
  }
  goToChangeLoyer(box: any) {
    this.router.navigate(['/admin/shop-user-loyer/', box._id]);
  }
}
