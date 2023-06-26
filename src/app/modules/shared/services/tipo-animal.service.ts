import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class TipoAnimalService {

  constructor(private http: HttpClient) { }

  getTipoAnimal(){
    const endpoint = `${base_url}/tipoanimales`
    return this.http.get(endpoint);
  }
}
