import { Component, OnInit } from '@angular/core';

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

  selectedQuantity: Quantity | undefined;

  ngOnInit() {
    this.quantity = [
      { name: '1', code: '1' },
      { name: '2', code: '2' },
      { name: '3', code: '3' },
      { name: '4', code: '4' },
      { name: '5', code: '5' },
    ];
  }
}
