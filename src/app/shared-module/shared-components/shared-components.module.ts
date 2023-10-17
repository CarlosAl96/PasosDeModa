import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';


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
    DropdownModule,
    MessageModule,
    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    TableModule,
    MultiSelectModule,
    TagModule,
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
    DropdownModule,
    MessageModule,
    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    TableModule,
    MultiSelectModule,
    TagModule,
  ],
  providers: [DialogService],
})
export class SharedComponentsModule {}
