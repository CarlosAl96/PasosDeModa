import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formLogin: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder) {}

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
}
