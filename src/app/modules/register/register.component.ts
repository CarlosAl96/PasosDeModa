import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _fire: FirebaseService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formLogin = this._formBuilder.group({
      name: ['', [Validators.compose([Validators.required])]],
      surname: ['', [Validators.compose([Validators.required])]],
      email: ['', [Validators.compose([Validators.required])]],
      phone: ['', [Validators.compose([Validators.required])]],
      address: ['', [Validators.compose([Validators.required])]],
      password: ['', [Validators.compose([Validators.required])]],
      confirmPassword: ['', [Validators.compose([Validators.required])]],
    });
  }

  save() {
    if (this.formLogin.valid) {
      const user: User = {
        id_user: '',
        name: this.formLogin.controls['name'].value,
        surname: this.formLogin.controls['surname'].value,
        email: this.formLogin.controls['email'].value,
        phone: this.formLogin.controls['phone'].value,
        address: this.formLogin.controls['address'].value,
        password: this.formLogin.controls['password'].value,
      };

      this._fire.registerUser(user);
    }
  }
}
