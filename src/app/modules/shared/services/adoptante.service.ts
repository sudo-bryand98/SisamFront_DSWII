import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdoptanteService {

  constructor(private http: HttpClient) { }

  getAdoptantes(){
    const endpoint = `${ base_url}/adoptantes`;
    return this.http.get(endpoint);
  }

  saveAdoptante(body:any){
    const endpoint = `${ base_url}/adoptantes`;
    return this.http.post(endpoint, body);
  }

  updateAdoptante(body: any, id: any){
    const endpoint = `${ base_url}/adoptantes/ ${id}`;
    return this.http.put(endpoint, body);
  }

  deleteAdoptante(id:any){
    const endpoint = `${ base_url}/adoptantes/ ${id}`;
    return this.http.delete(endpoint);
  }
}
