import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncargadoComponent } from './encargado/encargado.component';
import { NewEncargadoComponent } from './new-encargado/new-encargado.component';



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
