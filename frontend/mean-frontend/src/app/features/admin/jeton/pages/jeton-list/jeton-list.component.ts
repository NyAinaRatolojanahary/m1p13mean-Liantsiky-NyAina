import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableTwoComponent } from '../../../../../shared/components/table/table-two/table-two.component';
import { JetonService } from '../../services/jeton.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jeton-list',
  imports: [CommonModule, TableTwoComponent],
  templateUrl: './jeton-list.component.html',
  styleUrl: './jeton-list.component.css'
})
export class JetonListComponent implements OnInit {
  constructor(
    private jetonService : JetonService,
    private router : Router
  ) {}

  jetons : any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' },
    { header: 'Valeur', field: 'montant' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.loading = false;
    this.jetonService
      .getAll()
      .subscribe(res => {
        this.jetons = res
      });
  }
}
