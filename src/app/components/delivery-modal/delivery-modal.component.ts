import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductOrder } from 'src/app/core/models/product';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.css'],
})
export class DeliveryModalComponent {
  formRegister: FormGroup = new FormGroup({});

  message: string = '';
  loading: boolean = false;
  productOrders: ProductOrder[] | any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _fire: FirebaseService,
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private alertService: AlertServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.productOrders = this.dialogConfig.data;
  }

  buildForm(): void {
    this.formRegister = this._formBuilder.group({
      name: ['', [Validators.compose([Validators.required])]],
      address: ['', [Validators.compose([Validators.required])]],
      phone: ['', [Validators.compose([Validators.required])]],
      optionalPhone: ['', []],
    });
  }

  save() {
    this.formRegister.markAllAsTouched();
    this.formRegister.controls['name'].markAsDirty();
    this.formRegister.controls['address'].markAsDirty();
    this.formRegister.controls['phone'].markAsDirty();
    this.formRegister.controls['optionalPhone'].markAsDirty();

    if (this.formRegister.valid) {
      this.createOrder();
    }
  }

  createOrder(): void {
    this.loading = true;
    let processedCount = 0;

    this.productOrders.forEach(async (item) => {
      const data = {
        ...this.formRegister.value,
        price: item.product?.price,
        selectedQuantity: item.product?.selectedQuantity || 1,
        deliverMethod: 'delivery',
      };

      await this._fire.editOrder(item.id, data);
      processedCount++;

      if (processedCount === this.productOrders.length) {
        this.alertService.success('Compra creada exitosamente');

        this.ref.close();

        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      }
    });
  }
}
