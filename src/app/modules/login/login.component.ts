import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.compose([Validators.required])]],
      password: ['', [Validators.compose([Validators.required])]],
    });
  }
}
