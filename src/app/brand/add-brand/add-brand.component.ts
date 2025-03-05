import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Alert, SharedService } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  brandForm: FormGroup;
  loading: boolean = true
  loadingImg: boolean = false
  alert: Alert = new Alert()
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private sharedService: SharedService
  ) {

    this.brandForm= this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        picture: [''],
        active: [true],
      },
    );
  }

  ngOnInit() {}



  submitAction(top: HTMLElement) {
    if (this.brandForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.brandService.addBrand(this.brandForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.brandForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout du brand " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          console.error('Observer got an error: ' + err);
  
            this.alert = { success: false, msgEchec: "L'ajout du brand a été échoué ..", echec: true, open: true }
          this.validateBtnState = ClrLoadingState.ERROR;
        }
      );
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }
  

  closeImg(){
    this.brandForm.patchValue({ picture: null })
    this.loadingImg = false
    this.alert.open = false
  }

  uploadImg(pathUrl: any) {
    this.loadingImg = true
    this.alert.open = false
    let imageData = {
      path: pathUrl,
      folder: 'brand'
    }

    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.brandForm.patchValue({ picture: data.path })
        this.alert = { success: true, msgSuccess: "Le téléchargement de l'image a été effectué avec succès ..", echec: false, open: true }
        this.loadingImg = false
      },
      (err:any) => {
        console.error('Observer got an error: ' + err)
        this.brandForm.patchValue({ picture: null })
        this.uploadImageComponent.srcUrl = ''
        this.alert = { success: false, msgEchec: "Le téléchargement de l'image a été échoué ..", echec: true, open: true }
        this.loadingImg = false
      },
      () => this.loadingImg = false
    )
  }

}
