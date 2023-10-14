import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isResetPass: boolean = false;
  formLogin: FormGroup = new FormGroup({});
  message: string = '';
  messageSuccess: string = '';
  constructor(
    private _formBuilder: FormBuilder,
    private _fire: FirebaseService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.compose([Validators.required])]],
      password: ['', [Validators.compose([Validators.required])]],
    });
  }

  login() {
    this.formLogin.markAllAsTouched();
    this.formLogin.controls['email'].markAsDirty();
    this.formLogin.controls['password'].markAsDirty();

    if (this.formLogin.valid) {
      this._fire
        .login(this.formLogin.value)
        .then((resp) => {
          localStorage.setItem('uid', resp.user.uid);
          this._fire.setUser(resp.user.uid);
          console.log(resp);
          this.closeDialog();
        })
        .catch((error) => {
          this.message = 'Datos incorrectos';
        });
    } else {
      this.message = 'Ingrese sus datos';
    }
  }

  forgotPassword() {
    if (this.formLogin.controls['email'].valid) {
      this._fire
        .forgotPassword(this.formLogin.controls['email'].value)
        .then((resp) => {
          this.messageSuccess = 'Correo enviado';

          setTimeout(() => {
            this.isResetPass = false;
            this.messageSuccess = '';
            this.message = '';
          }, 2000);
        })
        .catch((error) => {
          console.log(error);

          this.message = 'No estas registrado';
        });
    }
  }

  closeDialog() {
    this.ref.close();
    this.isResetPass = false;
    this.message = '';
    this.messageSuccess = '';
  }
}
