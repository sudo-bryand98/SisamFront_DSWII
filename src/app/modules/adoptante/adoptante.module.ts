import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdoptanteComponent } from './adoptante/adoptante.component';
import { NewAdoptanteComponent } from './new-adoptante/new-adoptante.component';



@NgModule({
  declarations: [
    AdoptanteComponent,
    NewAdoptanteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdoptanteModule { }
