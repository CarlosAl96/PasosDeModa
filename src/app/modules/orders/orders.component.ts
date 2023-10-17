import { Component } from '@angular/core';
import { Order } from 'src/app/core/types/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: Order[] = [
    {
      client_name: 'John Doe',
      created_date: '17-10-2023',
      product_id: 1001,
      product_name: 'Reebok Classic',
      status: 'Pendiente',
    },
    {
      client_name: 'Jane Smith',
      created_date: '16-10-2023',
      product_id: 1002,
      product_name: 'Reebok Nano',
      status: 'Entregado',
    },
    {
      client_name: 'Mike Johnson',
      created_date: '15-10-2023',
      product_id: 1003,
      product_name: 'Reebok CrossFit',
      status: 'Pendiente',
    },
    {
      client_name: 'Emily Davis',
      created_date: '14-10-2023',
      product_id: 1004,
      product_name: 'Reebok Speed TR',
      status: 'Entregado',
    },
    {
      client_name: 'David Wilson',
      created_date: '13-10-2023',
      product_id: 1005,
      product_name: 'Reebok Zig Kinetica',
      status: 'Pendiente',
    },
    {
      client_name: 'Sarah Thompson',
      created_date: '12-10-2023',
      product_id: 1006,
      product_name: 'Reebok Club C',
      status: 'Entregado',
    },
    {
      client_name: 'Michael Brown',
      created_date: '11-10-2023',
      product_id: 1007,
      product_name: 'Reebok Royal',
      status: 'Pendiente',
    },
    {
      client_name: 'Michael Brown',
      created_date: '11-10-2023',
      product_id: 1007,
      product_name: 'Reebok Royal',
      status: 'Pendiente',
    },
    {
      client_name: 'Jessica Davis',
      created_date: '10-10-2023',
      product_id: 1008,
      product_name: 'Reebok Floatride',
      status: 'Entregado',
    },
    {
      client_name: 'Robert Johnson',
      created_date: '09-10-2023',
      product_id: 1009,
      product_name: 'Reebok Instapump Fury',
      status: 'Pendiente',
    },
    {
      client_name: 'Jennifer Smith',
      created_date: '08-10-2023',
      product_id: 1010,
      product_name: 'Reebok DMX',
      status: 'Entregado',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
