import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AnimalModule } from '../animal/animal.module';
import { AdoptanteModule } from '../adoptante/adoptante.module';
import { EncargadoModule } from '../encargado/encargado.module';
import { SolicitudModule } from '../solicitud/solicitud.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnimalModule,
    AdoptanteModule,
    EncargadoModule,
    SolicitudModule
  ]
})
export class DashboardModule { }
