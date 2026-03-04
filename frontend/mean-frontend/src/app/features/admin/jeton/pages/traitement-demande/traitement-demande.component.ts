import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JetonService } from '../../services/jeton.service';
import { Router } from '@angular/router';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';

@Component({
  selector: 'app-traitement-demande',
  imports: [CommonModule, TableOneComponent],
  templateUrl: './traitement-demande.component.html',
  styleUrl: './traitement-demande.component.css'
})
export class TraitementDemandeComponent implements OnInit{
  constructor(
    private jetonService : JetonService,
    private router : Router
  ){}

  demandes : any[] =[];
  loading = false;

  columns = [
    { header: 'Client', field: 'clientNom' },
    { header: 'Mode Paiement', field: 'modeNom' },
    { header: 'Reference', field: 'referenceVirement' },
    { header: 'Date Demande', field: 'dateDemande' },
    { header: 'status', field: 'statusNom' },
    { header: 'Montant total', field: 'montantTotal' },
  ];

  action = 'Traiter';

  page = 1;
  totalPages = 1;
  limit = 4;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = false;
    this.jetonService
    .getNonTraiterPaginated(this.page, this.limit)
    .subscribe(res => {
      // add etageNom property to each box
      this.demandes = res.data.map((demande: any) => ({
        ...demande,
        clientNom: demande.clientId ? demande.clientId.nom : '',
        modeNom: demande.modePaiementId ? demande.modePaiementId.nom : '',
        statusNom: demande.status ? demande.status.nom : '',
        
      }));

      this.totalPages = res.pagination.totalPages;
      this.page = res.pagination.page;
      this.loading = false;
    });
  }

  goToChangeLoyer(demande: any) {
    console.log('Go to change loyer for box', demande);
    this.jetonService.traiterDemande(demande._id, demande);
    this.router.navigate(['/admin/demande-jeton/list']);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadData();
  }
}
