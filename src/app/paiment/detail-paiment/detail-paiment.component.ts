import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Paiment } from '../paiment';
import { PaimentService } from '../paiment.service';

@Component({
  selector: 'app-detail-paiment',
  templateUrl: './detail-paiment.component.html',
  styleUrl: './detail-paiment.component.css'
})
export class DetailPaimentComponent {

  @Input() allSelected: any[] = [];  
  paiment = new Paiment();
  showAlert: boolean = false;
  paimentId: number = -1;
  currentPaiment: number = -1;
  loading: boolean = true;
  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paimentService: PaimentService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {

    this.currentPaiment = +this.sharedService.getCookie('idPaiment');

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.paimentId = Number(params.get('id'));
      this.getPaiment();
    });
  }
  paymentModes: { [key: string]: string } = {
    '💳 credit-card': '💳 Carte de crédit',
    '💵 cash': '💵 Espèces',
    '🏦 debit-card': '🏦 Carte de débit',
    '🌐 online': '🌐 En ligne'
  };
  
  getPaymentModeLabel(mode: string): string {
    return this.paymentModes[mode] || 'Non disponible';
  }
  
  

  getPaiment() {
    this.paimentService.getPaiment(this.paimentId).subscribe(
      (data: any) => {
        this.paiment = data;
      },
      err => {
        console.error('Erreur lors de la récupération du mode de paiement: ' + err);
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
    this.router.navigate(['../../paiments']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }
}
