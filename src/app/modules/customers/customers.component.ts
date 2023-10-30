import { Component } from '@angular/core';
import { Customer } from 'src/app/core/types/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  customers: Customer[] = [
    {
      client_name: 'Luis Martínez',
      email: 'luis_martinez@example.com',
      n_pedidos: 4,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Sofía Pérez',
      email: 'sofia_perez@example.com',
      n_pedidos: 8,
      reputacion: 'Buena',
    },
    {
      client_name: 'Carlos Gómez',
      email: 'carlos_gomez@example.com',
      n_pedidos: 7,
      reputacion: 'Buena',
    },
    {
      client_name: 'María Díaz',
      email: 'maria_diaz@example.com',
      n_pedidos: 6,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Elena Rodríguez',
      email: 'elena_rodriguez@example.com',
      n_pedidos: 9,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Diego Sánchez',
      email: 'diego_sanchez@example.com',
      n_pedidos: 4,
      reputacion: 'Buena',
    },
    {
      client_name: 'Ana Pérez',
      email: 'ana_perez@example.com',
      n_pedidos: 10,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Juan Gómez',
      email: 'juan_gomez@example.com',
      n_pedidos: 3,
      reputacion: 'Buena',
    },
    {
      client_name: 'Luis López',
      email: 'luis_lopez@example.com',
      n_pedidos: 8,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Carlos Pérez',
      email: 'carlos_perez@example.com',
      n_pedidos: 2,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'María Martínez',
      email: 'maria_martinez@example.com',
      n_pedidos: 5,
      reputacion: 'Buena',
    },
    {
      client_name: 'Sofía López',
      email: 'sofia_lopez@example.com',
      n_pedidos: 1,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Pedro Sánchez',
      email: 'pedro_sanchez@example.com',
      n_pedidos: 4,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Laura Díaz',
      email: 'laura_diaz@example.com',
      n_pedidos: 9,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Diego Torres',
      email: 'diego_torres@example.com',
      n_pedidos: 6,
      reputacion: 'Buena',
    },
    {
      client_name: 'Elena Gómez',
      email: 'elena_gomez@example.com',
      n_pedidos: 3,
      reputacion: 'Buena',
    },
    {
      client_name: 'Sofía Rodríguez',
      email: 'sofia_rodriguez@example.com',
      n_pedidos: 7,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Luis Sánchez',
      email: 'luis_sanchez@example.com',
      n_pedidos: 10,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Juan Díaz',
      email: 'juan_diaz@example.com',
      n_pedidos: 2,
      reputacion: 'Buena',
    },
    {
      client_name: 'María López',
      email: 'maria_lopez@example.com',
      n_pedidos: 8,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Carlos Torres',
      email: 'carlos_torres@example.com',
      n_pedidos: 5,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Ana Martínez',
      email: 'ana_martinez@example.com',
      n_pedidos: 6,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Diego Rodríguez',
      email: 'diego_rodriguez@example.com',
      n_pedidos: 4,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Pedro López',
      email: 'pedro_lopez@example.com',
      n_pedidos: 1,
      reputacion: 'Buena',
    },
    {
      client_name: 'Elena Martínez',
      email: 'elena_martinez@example.com',
      n_pedidos: 7,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Sofía Martínez',
      email: 'sofia_martinez@example.com',
      n_pedidos: 3,
      reputacion: 'Buena',
    },
    {
      client_name: 'Carlos López',
      email: 'carlos_lopez@example.com',
      n_pedidos: 9,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Juan Rodríguez',
      email: 'juan_rodriguez@example.com',
      n_pedidos: 5,
      reputacion: 'Muy buena',
    },
    {
      client_name: 'Ana Torres',
      email: 'ana_torres@example.com',
      n_pedidos: 2,
      reputacion: 'Muy mala',
    },
    {
      client_name: 'Luis Torres',
      email: 'luis_torres@example.com',
      n_pedidos: 10,
      reputacion: 'Buena',
    },
    {
      client_name: 'María Sánchez',
      email: 'maria_sanchez@example.com',
      n_pedidos: 4,
      reputacion: 'Muy mala',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
