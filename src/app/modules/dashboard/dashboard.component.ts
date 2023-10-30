import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Pedidos', icon: 'pi pi-fw pi-check-square' },
      { label: 'Productos', icon: 'pi pi-fw pi-book' },
      { label: 'Clientes', icon: 'pi pi-fw pi-users' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    console.log(this.activeItem);
  }

  activateLast() {
    this.activeItem = (this.items as MenuItem[])[
      (this.items as MenuItem[]).length - 1
    ];
  }
}
