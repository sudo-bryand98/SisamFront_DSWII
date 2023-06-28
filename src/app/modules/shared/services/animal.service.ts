import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  getAnimales(){
    const endpoint = `${ base_url}/animales`;
    return this.http.get(endpoint);
  }

  saveAnimal(body:any){
    const endpoint = `${ base_url}/animales`;
    return this.http.post(endpoint, body);
  }

  updateAnimal(body: any, id: any){
    const endpoint = `${ base_url}/animales/ ${id}`;
    return this.http.put(endpoint, body);
  }

  deleteAnimal(id:any){
    const endpoint = `${ base_url}/animales/ ${id}`;
    return this.http.delete(endpoint);
  }

  getAnimalById(id: any){
    const endpoint = `${base_url}/animales/ ${id}`;
    return this.http.get(endpoint);
  }
}
