import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Brand } from '../../brand/brand';
import { BrandService } from '../../brand/brand.service';
import { SharedService } from '../../shared/shared.service';
import { Modele } from '../modele';
import { ModeleService } from '../modele.service';

@Component({
  selector: 'app-detail-modele',
  templateUrl: './detail-modele.component.html',
  styleUrl: './detail-modele.component.css'
})
export class DetailModeleComponent {

  @Input() allSelected: any[] = [];  
  modele = new Modele();
  showAlert: boolean = false;
  modeleId: number = -1;
  currentModele: number = -1;
  brands: Brand[] = [];
  loading: boolean = true;
  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modeleService: ModeleService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {

    this.currentModele = +this.sharedService.getCookie('idModele');

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.modeleId = Number(params.get('id'));
      this.getModele();
    });
  }

  getModele() {
    this.modeleService.getModele(this.modeleId).subscribe(
      (data: any) => {
        this.modele = data;
      },
      err => {
        console.error('Erreur lors de la récupération du modèle: ' + err);
      }
    );
  }

 
  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../modeles']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }
}
