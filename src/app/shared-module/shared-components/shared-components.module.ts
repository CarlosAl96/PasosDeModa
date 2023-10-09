import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

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
    DialogModule,
    InputTextModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    DialogModule,
    InputTextModule,
  ],
  providers: [DialogService],
})
export class SharedComponentsModule {}
