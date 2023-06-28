import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TipodocServiceService {

  constructor(private http: HttpClient) { }


  getTiposDocs(){
    const endpoint = `${base_url}/tipodoc`;
    return this.http.get(endpoint);
  }

}
