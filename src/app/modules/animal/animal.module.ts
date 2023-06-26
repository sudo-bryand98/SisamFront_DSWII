import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalComponent } from './animal/animal.component';
import { NewAnimalComponent } from './new-animal/new-animal.component';



@NgModule({
  declarations: [
    AnimalComponent,
    NewAnimalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AnimalModule { }
