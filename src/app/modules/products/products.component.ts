import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productList: any[] = [1, 2, 3, 4, 5, 6];

  constructor() {}
}
