import { Component } from '@angular/core';
import { Providers } from '../providers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProvidersService } from '../providers.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
    providers = new Providers()
    showAlert: boolean = false;
    providersId: number = -1;
    currentProviders: number = -1
      
   
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private providersService: ProvidersService, private sharedService: SharedService) { }
  
    ngOnInit(): void {
      this.currentProviders = +this.sharedService.getCookie('idProviders')
  
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.providersId = Number(params.get('id'))
        this.getProviders()
  
      })
    }
  
    getProviders() {
      this.providersService.getProvider(this.providersId).subscribe(
        (data:any) => {
          this.providers = data
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
  
    deleteAction() {
      this.showAlert = true;
    }
  
    close() {
      this.showAlert = false;
    }
  
    save() {
      this.router.navigate(['../../providerss']);
      this.showAlert = false;
    }
  
    redirectTo() {
     window.history.back();
    }
  }

