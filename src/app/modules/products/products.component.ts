import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  productList: Product[] = [];

  sortType: string = '';

  constructor(private _fire: FirebaseService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  async getProductList() {
    this.allProducts = await this._fire.getProducts();
    this.productList = await this._fire.getProducts();
  }

  handleProductsFilter(type: string, value: string | string[]): void {
    if (type === 'sort') {
      this.productList = this.productList.sort((a, b) =>
        value === 'high' ? b.price - a.price : a.price - b.price
      );

      this.sortType = value as string;
    }

    if (type === 'gender') {
      this.productList = this.allProducts.filter((product) =>
        value.includes(product.gender.label)
      );

      if (value.length === 0) {
        this.productList = this.allProducts;

        if (this.sortType) {
          this.productList = this.productList.sort((a, b) =>
            this.sortType === 'high' ? b.price - a.price : a.price - b.price
          );
        }
      }
    }
  }
}
