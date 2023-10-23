import { Component, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/models/user';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SelectItem } from 'primeng/api';
import { Category, Gender, Model } from 'src/app/core/models/product';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  formRegister: FormGroup = new FormGroup({});

  message: string = '';
  categories: Category[] = [];
  genders: Gender[] = [];
  models: Model[] = [];
  productImages: string[] = [];
  loading: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 50,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  genderOptions: SelectItem[] = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Unisex', value: 'unisex' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _fire: FirebaseService,
    public ref: DynamicDialogRef,
    private alertService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getModel();
    this.getGenders();

    this.buildForm();
  }

  async getCategories() {
    this.categories = await this._fire.getCategories();
  }

  async getModel() {
    this.models = await this._fire.getModels();
  }

  async getGenders() {
    this.genders = await this._fire.getGenders();
  }

  buildForm(): void {
    this.formRegister = this._formBuilder.group({
      name: ['', [Validators.compose([Validators.required])]],
      model: ['', [Validators.compose([Validators.required])]],
      gender: ['', [Validators.compose([Validators.required])]],
      price: ['', [Validators.compose([Validators.required])]],
      category: ['', [Validators.compose([Validators.required])]],
    });
  }

  save() {
    this.formRegister.markAllAsTouched();
    this.formRegister.controls['name'].markAsDirty();
    this.formRegister.controls['model'].markAsDirty();
    this.formRegister.controls['gender'].markAsDirty();
    this.formRegister.controls['price'].markAsDirty();
    this.formRegister.controls['category'].markAsDirty();

    if (!this.formRegister.valid || this.productImages.length === 0) {
      this.message = 'Todos los campos del formulario son requeridos';

      return;
    }

    this.loading = true;

    const category = this.categories.find(
      (category) => category.value === this.formRegister.get('category')?.value
    );
    const model = this.models.find(
      (model) => model.value === this.formRegister.get('model')?.value
    );
    const gender = this.genders.find(
      (gender) => gender.value === this.formRegister.get('gender')?.value
    );

    const data = {
      ...this.formRegister.value,
      category: {
        id: category?.id,
        name: category?.label,
        code: category?.value,
      },
      model: {
        id: model?.id,
        category_id: model?.category_id,
        name: model?.label,
        code: model?.value,
      },
      gender: {
        id: gender?.id,
        name: gender?.label,
        code: gender?.value,
      },
      images: this.productImages,
    };

    if (this.formRegister.valid) {
      this._fire
        .AddProduct(data)
        .then((response) => {
          this.alertService.success('Producto creado Exitosamente');

          this.loading = false;

          this.closeDialog();
        })
        .catch((error) => {
          this.alertService.success('Ha ocurrido un error');
          this.loading = false;
        });
    }
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    this.productImages = [...this.productImages, args[1]?.files?.file];
  }

  closeDialog() {
    this.ref.close('hola');
    this.message = '';
  }
}
