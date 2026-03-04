import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableOneComponent } from '../../../../../shared/components/table/table-one/table-one.component';
import { ModePaiementService } from '../../services/mode-paiement.service';
import { Router } from '@angular/router';
import { TableTwoComponent } from '../../../../../shared/components/table/table-two/table-two.component';

@Component({
  selector: 'app-mode-list',
  imports: [CommonModule, TableTwoComponent],
  templateUrl: './mode-list.component.html',
  styleUrl: './mode-list.component.css'
})
export class ModeListComponent implements OnInit {
  constructor(
    private modeService: ModePaiementService,
    private router : Router
  ) {}

  modes : any[] = [];
  loading = false;
  columns = [
    { header: 'Nom', field: 'nom' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.loading = false;
    this.modeService
      .getAll()
      .subscribe(res => {
        this.modes = res
      });
  }
}
