import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AnimalModule } from '../animal/animal.module';
import { TipoAnimalModule } from '../tipoAnimal/tipo-animal.module';
import { EncargadoModule } from '../encargado/encargado.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnimalModule,
    TipoAnimalModule,
    EncargadoModule
  ]
})
export class DashboardModule { }
