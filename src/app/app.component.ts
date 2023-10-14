import { Component } from '@angular/core';
import { FirebaseService } from './core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PasosDeModa';

  constructor(private _fire: FirebaseService) {
    if (localStorage.getItem('uid')) {
      this._fire.setUser(localStorage.getItem('uid') || '');
    }
  }
}
