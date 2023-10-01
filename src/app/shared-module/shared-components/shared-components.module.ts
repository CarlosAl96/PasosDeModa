import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    CarouselModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    CarouselModule,
  ],
})
export class SharedComponentsModule {}
