
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from "@clr/angular";
import { FilterDto } from "../../filter.dto";
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from "../../shared/shared.service";
import { Client } from "../client";
import { ClientService } from "../client.service";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']

})
export class ClientsComponent  {
  clients: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Client[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentClient: number = -1;
  constructor(private clientService: ClientService, private router: Router, private sharedService:SharedService) {}

  ngOnInit() {
    this.currentClient = +this.sharedService.getCookie('idClient')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state))
    this.getClients()
  }

  getClients() {
    this.clientService.getClients(this.filter).subscribe(
      data => {
        this.clients = data[0]
        this.count = data[1]
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        this.loading = false
      }
    )
  }

  close() {
    this.showAlert = false;
    this.allSelected = []
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }

  existInSelected(item: Client) {
    return this.allSelected.findIndex(elem => elem.id == item.id) >= 0
  }

  selectionChanged() {
    this.allSelected = this.allSelected.reverse()
    .filter((item, index, self) => index === self.findIndex((tab) => (tab.id === item.id)))
    this.idsSelected = this.allSelected.map(elem => elem.id)
  }


  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map(elem => elem.id)
    this.showAlert = true
  }

  editAction() {
    this.router.navigate(['/clients/edit/', this.allSelected[0].id]);
  }

}
