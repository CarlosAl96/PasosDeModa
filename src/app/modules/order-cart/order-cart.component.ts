import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductOrder } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

interface Quantity {
  name: string;
  code: string;
}

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss'],
})
export class OrderCartComponent implements OnInit {
  quantity: Quantity[] | undefined;
  productOrders: ProductOrder[] | any[] = [];
  products: ProductOrder[] | any[] = [];

  selectedQuantity: Quantity | undefined;
  productPrices: { id: string; price: number; quantity: number }[] = [];
  user: User | undefined;
  loading: boolean = false;

  constructor(
    private _fire: FirebaseService,
    private alertService: AlertServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this._fire.getUser().subscribe((resp) => {
      this.user = resp;
      this.getProductOrder(this.user.id_user);
    });
  }

  async getProductOrder(userId: string) {
    this.productOrders = await this._fire.getProductOrder(userId);
    this.products = await this._fire.getProductOrder(userId);
  }

  handleTotalPrices(productId: string, value: any) {
    const findProduct = this.productOrders.find(
      (item) => item.productId === productId
    );

    if (findProduct) {
      findProduct.product.price = this.products.find(
        (item) => item.productId === productId
      )?.product.price;

      findProduct.product.price =
        findProduct.product.price * parseInt(value.value.code);

      findProduct.product.selectedQuantity = parseInt(value.value.code);

      this.productOrders = this.productOrders.map((item) => {
        if (item.productId === findProduct.productId) {
          item.product = findProduct.product;
          return item;
        }

        return item;
      });
    }
  }

  getTotalPrice(): number {
    let acum = 0;
    for (const item of this.productOrders) {
      acum += parseInt(item?.product?.price); // Ejemplo: Sumar la cantidad de cada item
    }

    return acum;
  }

  createOrder(): void {
    this.loading = true;
    let processedCount = 0;

    this.productOrders.forEach(async (item) => {
      const data = {
        price: item.product.price,
        selectedQuantity: item.product.selectedQuantity,
      };

      await this._fire.editOrder(item.id, data);
      processedCount++;

      if (processedCount === this.productOrders.length) {
        this.alertService.success('Compra creada exitosamente');

        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      }
    });
  }
}
