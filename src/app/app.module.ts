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
import { OrderCartComponent } from './modules/order-cart/order-cart.component';
import { FilterAccordionComponent } from './components/filter-accordion/filter-accordion.component';
import { OrdersComponent } from './modules/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavBarComponent,
    CardComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    OrderCartComponent,
    FilterAccordionComponent,
    OrdersComponent,
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
