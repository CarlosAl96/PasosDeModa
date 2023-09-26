import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ProductsComponent } from './modules/products/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedComponentsModule } from './shared-module/shared-components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsComponent,
    NavBarComponent,
  ],
  imports: [BrowserModule, SharedComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
