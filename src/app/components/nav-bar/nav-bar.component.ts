import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  isLogged: boolean = false;
  isLoadedComponent: boolean = false;

  constructor(
    private _dialogService: DialogService,
    private _fire: FirebaseService
  ) {}

  ngOnInit() {
    this._fire.getUser().subscribe((resp) => {
      if (resp.id_user !== '') {
        this.userName = resp.name + ' ' + resp.surname;
        this.isLogged = true;
        this.isLoadedComponent = true;
      } else {
        this.isLogged = false;
        this.isLoadedComponent = true;
      }
    });
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
