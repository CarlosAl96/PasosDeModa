import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Product } from 'src/app/core/models/product';
import { CreateProductComponent } from 'src/app/modules/create-product/create-product.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: Product | undefined;
  @Output() refreshList = new EventEmitter<boolean>();
  ref: DynamicDialogRef | any;

  constructor(public _dialogService: DialogService) {}

  showDeliveryModal() {
    this.ref = this._dialogService.open(CreateProductComponent, {
      header: 'Editar producto',
      data: this.product,
    });

    if (this.ref) {
      this.ref.onClose.subscribe((ouput: any) => {
        this.refreshList.emit(true);
      });
    }
  }
}
