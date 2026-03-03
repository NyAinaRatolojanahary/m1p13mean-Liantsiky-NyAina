import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoutiqueService } from '../../services/boutique.service';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';

@Component({
  selector: 'app-boutique-list',
  imports: [TableOneComponent],
  templateUrl: './boutique-list.component.html',
  styleUrl: './boutique-list.component.css'
})
export class BoutiqueListComponent implements OnInit {
  constructor(
    private boutiqueService: BoutiqueService,
    private router : Router
  ) {}
  //inputs
  boutiques : any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Date Creation', field: 'dateCreation' },
    { header: 'Proprietaire', field: 'proprietaireEmail' },
    { header: 'Box', field: 'boxNom' },
  ];
  action = 'Edit';
  page = 1;
  totalPages = 1;
  limit = 2;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = false;

    // this.boutiqueService
    //   .getAllPaginated(this.page, this.limit)
    //   .subscribe(res => {
    //     this.boutiques = res.data;
    //     this.totalPages = res.pagination.totalPages;
    //     this.page = res.pagination.page;
    //     this.loading = false;
    //   });
    this.boutiqueService
  .getAllPaginated(this.page, this.limit)
  .subscribe(res => {
    // preprocess nested fields
    this.boutiques = res.data.map((b: any) => ({
      ...b,
      proprietaireEmail: b.proprietaireId ? b.proprietaireId.email : '',
      boxNom: b.boxId ? b.boxId.nom : ''
    }));

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
    console.log('Go to change loyer for box', box);
    this.router.navigate(['/admin/box-loyer/', box._id]);
  }
}
