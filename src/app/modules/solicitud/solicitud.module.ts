import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { NewSolicitudComponent } from './new-solicitud/new-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    SolicitudComponent,
    NewSolicitudComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SolicitudModule { }
