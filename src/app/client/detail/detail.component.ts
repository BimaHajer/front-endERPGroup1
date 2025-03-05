import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  client = new Client()
  // clientAdd = new Client()
  // ClientEdit = new Client()
  showAlert: boolean = false;
  clientId: number = -1;
  currentClient: number = -1
  // disable: boolean = false;
  // created: string = ''
  // updated: string = ''
  // src: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private clientService: ClientService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentClient = +this.sharedService.getCookie('idClient')

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.clientId = Number(params.get('id'))
      this.getClient()

    })
  }

  getClient() {
    this.clientService.getClient(this.clientId).subscribe(
      (data:any) => {
        this.client = data
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
    this.router.navigate(['../../clients']);
    this.showAlert = false;
  }

  redirectTo() {
   window.history.back();
  }
}
