import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ProductsComponent } from './modules/products/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedComponentsModule } from './shared-module/shared-components/shared-components.module';
import { CardComponent } from './components/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsComponent,
    NavBarComponent,
    CardComponent,
    ProductDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
