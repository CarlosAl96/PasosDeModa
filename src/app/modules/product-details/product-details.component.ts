import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { Product, ProductOrder } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

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
  product: Partial<Product> = {};
  productId: string = '';
  user: User = {
    id_user: '',
    name: '',
    surname: '',
    phone: '',
    address: '',
  };
  loading: boolean = false;
  selectedSize: string = '';

  responsiveOptions: any[] = [];
  constructor(
    private _fire: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this._fire.getUser().subscribe((resp) => {
      this.user = resp;
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.getProduct(id as string);
      this.productId = id as string;
    });
  }

  async getProduct(id: string) {
    this.product = await this._fire.getProduct(id);
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  saveOrder(): void {
    this.loading = true;
    const data: ProductOrder = {
      productId: this.productId,
      userId: this.user.id_user,
      dateCreated: dayjs().format('DD-MM-YYYY'),
      status: 'in_proccess',
      selectedSize: this.selectedSize,
    };

    this._fire
      .AddProductOrder(data)
      .then((response) => {
        this.alertService.success('Producto añadido al carrito Exitosamente');

        this.loading = false;

        this.router.navigate(['/cart']);
      })
      .catch((error) => {
        console.log(error);
        this.alertService.success('Ha ocurrido un error');
        this.loading = false;
      });
  }
}
