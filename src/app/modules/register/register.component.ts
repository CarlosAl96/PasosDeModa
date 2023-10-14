import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/models/user';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister: FormGroup = new FormGroup({});

  message: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _fire: FirebaseService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formRegister = this._formBuilder.group({
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
    this.formRegister.markAllAsTouched();
    this.formRegister.controls['name'].markAsDirty();
    this.formRegister.controls['surname'].markAsDirty();
    this.formRegister.controls['email'].markAsDirty();
    this.formRegister.controls['phone'].markAsDirty();
    this.formRegister.controls['address'].markAsDirty();
    this.formRegister.controls['password'].markAsDirty();
    this.formRegister.controls['confirmPassword'].markAsDirty();

    if (!this.formRegister.valid) {
      this.message = 'Todos los campos del formulario son requeridos';
    } else if (
      this.formRegister.controls['password'].value !=
      this.formRegister.controls['confirmPassword'].value
    ) {
      this.formRegister.controls['confirmPassword'].setValue('');
      this.message = 'Las contraseñas no coinciden';
    }

    if (this.formRegister.valid) {
      const user: User = {
        id_user: '',
        name: this.formRegister.controls['name'].value,
        surname: this.formRegister.controls['surname'].value,
        email: this.formRegister.controls['email'].value,
        phone: this.formRegister.controls['phone'].value,
        address: this.formRegister.controls['address'].value,
        password: this.formRegister.controls['password'].value,
      };

      this._fire
        .registerUser(user)
        .then((userCredential) => {
          const userSaved = userCredential.user;
          this._fire
            .registerDataUser(user, userSaved.uid)
            .then((resp) => {
              console.log(resp);
              this.closeDialog();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.message);
          if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
            this.message = 'Y existe una cuenta con el mismo email';
          } else {
            this.message = 'La contraseña debe tener minimo 6 caracteres';
          }
        });
    }
  }

  validateRepeatPass(control: FormControl) {
    if (control.value != this.formRegister.controls['password']) {
      return { invalidValue: true };
    }
    return null;
  }

  closeDialog() {
    this.ref.close();
    this.message = '';
  }
}
