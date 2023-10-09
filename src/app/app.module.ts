import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './modules/products/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedComponentsModule } from './shared-module/shared-components/shared-components.module';
import { CardComponent } from './components/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavBarComponent,
    CardComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
