import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  @Input() allSelected: number[] | undefined
  @Output() closed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<boolean>();

  alertError: boolean = false
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  toDisable: number[] = []
  toDelete: number[] = []
  msgAlertDisable: string = ''
  msgAlertDelete: string = ''
  idsDisable: string = ''
  idsDelete: string = '' 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if (this.allSelected?.length != 0) {
      this.productService.getProducts({ loadRelationIds: true, where: { id: {type: "in", value: this.allSelected} } }).subscribe(
        data => {
          data[0].forEach((element:any) => {
            if (element.images?.length != 0 ) {
              if (element.id != undefined) {
                this.toDisable.push(element.id)
                this.idsDisable = this.idsDisable + element.id + ', '
              }
            } else
              if (element.id != undefined) {
                this.toDelete.push(element.id)
                this.idsDelete = this.idsDelete + element.id+ ', '} 

            if (this.toDelete.length + this.toDisable.length == this.allSelected?.length) {
              if (this.toDisable.length != 0) {
                if (this.toDisable.length == 1) {
                  this.msgAlertDisable = "Produit: \" " + this.toDisable + " \" a des relations avec d'autres tables. Vous ne pouvez que le désactiver !"
                } else
                  this.msgAlertDisable = "Les Produits: \" " + this.toDisable + " \" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !"
              }
              if (this.toDelete.length != 0) {
                if (this.toDelete.length == 1) {
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer Produit: \" " + this.toDelete + " \" !"
                } else
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer Les produits: \" " + this.toDelete + " \" !"
              }
            }
          })
        })
    }
  }

  close() {
    this.closed.emit(false);
  }

  deleteProduct() {
    if (this.allSelected?.length != 0) {
      this.validateBtnState = ClrLoadingState.LOADING
      this.productService.deleteMultiple(this.toDelete, this.toDisable).subscribe(
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
