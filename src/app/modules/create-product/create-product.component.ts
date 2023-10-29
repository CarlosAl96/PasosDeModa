import { Component, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { SelectItem } from 'primeng/api';
import { Category, Gender, Model, Product } from 'src/app/core/models/product';
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
  previewImages: string[] = [];
  loading: boolean = false;

  sizes: string[] = [
    'H 5 / M 6.5',
    'H 5.5 / M 7',
    'H 6 / M 7.5',
    'H 6.5 / M 8',
    'H 7 / M 8.5',
    'H 7.5 / M 9',
    'H 8 / M 9.5',
    'H 8.5 / M 10',
    'H 9 / M 10.5',
    'H 9.5 / M 11',
    'H 10 / M 12.5',
    'H 10.5 / M 13',
    'H 11 / M 13.5',
  ];

  selectedSizes: string[] = [];

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
    private alertService: AlertServiceService,
    public DialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getModel();
    this.getGenders();

    console.log(this.DialogConfig);

    this.buildForm(this.DialogConfig.data);
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

  buildForm(product?: Product): void {
    this.formRegister = this._formBuilder.group({
      name: [product?.name || '', [Validators.compose([Validators.required])]],
      model: [
        product?.model?.code || '',
        [Validators.compose([Validators.required])],
      ],
      gender: [
        product?.gender?.code || '',
        [Validators.compose([Validators.required])],
      ],
      price: [
        product?.price || '',
        [Validators.compose([Validators.required])],
      ],
      category: [
        product?.category?.code || '',
        [Validators.compose([Validators.required])],
      ],
      quantity: [
        product?.quantity || '',
        [Validators.compose([Validators.required])],
      ],
    });

    if (product) {
      this.selectedSizes = product.sizes;

      this.previewImages = product.images;
    }
  }

  handleSelectSizes(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter((item) => item !== size);
    } else {
      this.selectedSizes = [...this.selectedSizes, size];
    }
  }

  handlePreviewImages(item: string) {
    this.previewImages = this.previewImages.filter((image) => image !== item);
  }

  save() {
    this.formRegister.markAllAsTouched();
    this.formRegister.controls['name'].markAsDirty();
    this.formRegister.controls['model'].markAsDirty();
    this.formRegister.controls['gender'].markAsDirty();
    this.formRegister.controls['price'].markAsDirty();
    this.formRegister.controls['category'].markAsDirty();
    this.formRegister.controls['quantity'].markAsDirty();

    if (
      !this.formRegister.valid ||
      (this.productImages.length === 0 && this.previewImages.length === 0)
    ) {
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

    console.log(this.selectedSizes);

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
      images: [...this.productImages, ...this.previewImages],
      sizes: this.selectedSizes,
    };

    console.log(data);

    if (this.formRegister.valid) {
      if (!this.DialogConfig.data?.id) {
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
      } else {
        this._fire
          .editProduct(data, this.DialogConfig.data?.id)
          .then((response) => {
            this.alertService.success('Producto actualizado Exitosamente');

            this.loading = false;

            this.closeDialog();
          })
          .catch((error) => {
            this.alertService.success('Ha ocurrido un error');
            this.loading = false;
          });
      }
    }
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  convertToFile(
    base64String: string,
    filename: string,
    contentType: 'image/png'
  ) {
    const base64Content = base64String.split(',')[1];
    const byteCharacters = atob(base64Content);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    const file = new File([blob], filename, { type: contentType });
    return file;
  }

  public onUploadSuccess(args: any): void {
    this.productImages = [...this.productImages, args[1]?.files?.file];

    console.log(this.productImages);
  }

  closeDialog() {
    this.ref.close();
    this.message = '';
  }
}
