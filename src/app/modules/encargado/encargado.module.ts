import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncargadoComponent } from './encargado/encargado.component';
import { NewEncargadoComponent } from './new-encargado/new-encargado.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EncargadoComponent,
    NewEncargadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EncargadoModule { }
