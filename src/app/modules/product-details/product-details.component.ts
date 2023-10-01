import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productImages: string[] = [
    'shoe',
    'model-1-1',
    'model-1-2',
    'model-1-3',
    'model-1-4',
    'model-1-5',
  ];
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

  responsiveOptions: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
