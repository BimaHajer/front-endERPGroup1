import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { SharedService } from '../../shared/shared.service';  // Import du SharedService

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  brandId!: number;
  brand: Brand = new Brand();
  brandForm: FormGroup;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loading: boolean = false;
  loadingImg: boolean = false;
  alert: Alert = new Alert();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private sharedService: SharedService  
  ) {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [],
      picture: [],
      active: [],
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.brandId = Number(params.get('id'));
      this.getBrand();
    });
  }

  getBrand() {
    this.brandService.getBrand(this.brandId).subscribe(
      (data: any) => {
        this.brand = data;
        this.brandForm.patchValue(this.brand);
      },
      (err) => {
        console.error('Erreur : ' + err);
      }
    );
  }

  closeImg() {
    this.brandForm.patchValue({ picture: null });
    this.loadingImg = false;
    this.alert.open = false;
  }

  uploadImg(pathUrl: any) {
    this.loadingImg = true;
    this.alert.open = false;
    let imageData = {
      path: pathUrl,
      folder: 'brand',
      customName: this.brand.name ? this.brand.name + '-' + this.brand.id : 'brand-' + this.brand.id,
    };

   
    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.brand.picture = data.path;
        this.brandForm.patchValue({ picture: data.path });
        this.alert = { success: true, msgSuccess: "Le téléchargement de l'image a été effectué avec succès ..", echec: false, open: true };
        this.loadingImg = false;
      },
      (err: any) => {
        console.error('Erreur : ' + err);
        this.brandForm.patchValue({ picture: null });
        this.uploadImageComponent.srcUrl = '';
        this.alert = { success: true, msgSuccess: "La modification de client " + this.brand.id + " a été effectuée avec succès !", echec: false, open: true }
      },
      () => this.loadingImg = false
    );
  }

  submitAction(top: HTMLElement) {
    if (this.brandForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      if (this.brandId) {
        this.brandService.editBrand(this.brandId, this.brandForm.value).subscribe(
          (data) => {
            this.brand = data;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification du brand a été effectuée avec succès!", echec: false, open: true };
          },
          (err) => {
            console.error('Erreur lors de la modification de la marque:', err);
            this.alert = { success: false, msgEchec: "La modification de la marque a échoué!", echec: true, open: true };
            this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }
}
