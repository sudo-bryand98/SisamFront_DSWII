import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoAnimalComponent } from './components/tipo-animal/tipo-animal.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TipoAnimalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipoAnimalModule { }
