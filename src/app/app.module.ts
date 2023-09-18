import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ProductsComponent } from './modules/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
