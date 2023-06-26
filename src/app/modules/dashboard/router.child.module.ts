import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimalComponent } from '../animal/animal/animal.component';
import { TipoAnimalComponent } from '../tipoAnimal/components/tipo-animal/tipo-animal.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'animal', component: AnimalComponent },
    { path: 'tipoAnimal', component: TipoAnimalComponent }
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
