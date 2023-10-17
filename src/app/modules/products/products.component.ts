import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  productList: Product[] = [
    {
      name: 'Reebok Classic',
      price: 80,
      gender: 'unisex',
      availableColors: 5,
    },
    {
      name: 'Reebok Nano',
      price: 65,
      gender: 'femenino',
      availableColors: 20,
    },
    {
      name: 'Reebok CrossFit',
      price: 90,
      gender: 'masculino',
      availableColors: 4,
    },
    {
      name: 'Reebok Speed TR',
      price: 70,
      gender: 'unisex',
      availableColors: 6,
    },
    {
      name: 'Reebok Zig Kinetica',
      price: 120,
      gender: 'femenino',
      availableColors: 12,
    },
    {
      name: 'Reebok Club C',
      price: 55,
      gender: 'masculino',
      availableColors: 22,
    },
    {
      name: 'Reebok Royal',
      price: 50,
      gender: 'femenino',
      availableColors: 6,
    },
    {
      name: 'Reebok Floatride',
      price: 100,
      gender: 'unisex',
      availableColors: 13,
    },
    {
      name: 'Reebok Instapump Fury',
      price: 110,
      gender: 'masculino',
      availableColors: 9,
    },
    {
      name: 'Reebok DMX',
      price: 75,
      gender: 'femenino',
      availableColors: 15,
    },
    {
      name: 'Reebok Floatride Run',
      price: 95,
      gender: 'masculino',
      availableColors: 7,
    },
    {
      name: 'Reebok Classic',
      price: 60,
      gender: 'unisex',
      availableColors: 16,
    },
    {
      name: 'Reebok Nano',
      price: 85,
      gender: 'femenino',
      availableColors: 11,
    },
    {
      name: 'Reebok CrossFit',
      price: 100,
      gender: 'masculino',
      availableColors: 19,
    },
    {
      name: 'Reebok Speed TR',
      price: 80,
      gender: 'unisex',
      availableColors: 21,
    },
  ];

  sortType: string = '';

  constructor() {}

  ngOnInit(): void {
    this.allProducts = this.productList;
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
        value.includes(product.gender)
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
