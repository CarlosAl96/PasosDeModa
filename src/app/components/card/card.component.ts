import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Product } from 'src/app/core/models/product';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { CreateProductComponent } from 'src/app/modules/create-product/create-product.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() refreshList = new EventEmitter<boolean>();
  ref: DynamicDialogRef | any;
  isAdmin: boolean = false;
  constructor(
    public _dialogService: DialogService,
    private _fire: FirebaseService
  ) {}
  ngOnInit(): void {
    this._fire.getUser().subscribe((resp) => {
      console.log(resp);

      if (resp.role == 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

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
