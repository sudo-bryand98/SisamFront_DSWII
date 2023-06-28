import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimalComponent } from '../animal/animal/animal.component';
import { TipoAnimalComponent } from '../tipoAnimal/components/tipo-animal/tipo-animal.component';
import { AdoptanteComponent } from '../adoptante/adoptante/adoptante.component';
import { EncargadoComponent } from '../encargado/encargado/encargado.component';
import { SolicitudComponent } from '../solicitud/solicitud/solicitud.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'animal', component: AnimalComponent },
    { path: 'adoptante', component: AdoptanteComponent },
    { path: 'encargado', component: EncargadoComponent },
    { path: 'solicitud', component: SolicitudComponent }
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
