import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private _dialogService: DialogService) {}

  ngOnInit() {
    this.items = [];
  }

  showModalLogin() {
    this._dialogService.open(LoginComponent, {
      header: 'Iniciar sesión',
    });
  }

  showModalRegister() {
    this._dialogService.open(RegisterComponent, {
      header: 'Crear una nueva cuenta',
    });
  }
}
