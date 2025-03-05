import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  @Input() allSelected: number[] | undefined
  @Output() closed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<boolean>();

  alertError: boolean = false
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  toDisable: number[] = []
  toDelete: number[] = []
  msgAlertDisable: string = ''
  msgAlertDelete: string = ''

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    if (this.allSelected?.length != 0) {
      this.clientService.getClients({ loadRelationIds: true, where: { id: {type: "in", value: this.allSelected} } }).subscribe(
        data => {
          data[0].forEach((element:any) => {
           this.toDelete.push(element.id)

            if (this.toDelete.length + this.toDisable.length == this.allSelected?.length) {
              if (this.toDisable.length != 0) {
                if (this.toDisable.length == 1) {
                  this.msgAlertDisable = "Le client: \" " + this.toDisable + " \" a des relations avec d'autres tables. Vous ne pouvez que le désactiver !"
                } else
                  this.msgAlertDisable = "Les clients: \" " + this.toDisable + " \" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !"
              }
              if (this.toDelete.length != 0) {
                if (this.toDelete.length == 1) {
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer le client: \" " + this.toDelete + " \" !"
                } else
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer les clients: \" " + this.toDelete + " \" !"
              }
            }
          })
        })
    }
  }

  close() {
    this.closed.emit(false);
  }

  deleteClient() {
    if (this.allSelected?.length != 0) {
      this.validateBtnState = ClrLoadingState.LOADING
      this.clientService.deleteMultiple(this.toDelete, this.toDisable).subscribe(
        data => {
          if (data == true) {
            this.alertError = false
            this.saved.emit(true);
          } else
            this.alertError = true
        },
        err => {
          console.error('Observer got an error: ' + err)
          this.alertError = true
          this.validateBtnState = ClrLoadingState.ERROR
        }
      );
    }
  }
}
