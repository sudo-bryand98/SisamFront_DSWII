import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  getSolicitudes(){
    const endpoint = `${ base_url}/solicitudes`;
    return this.http.get(endpoint);
  }

  saveSolicitud(body:any){
    const endpoint = `${ base_url}/solicitudes`;
    return this.http.post(endpoint, body);
  }

  getSolicitudById(idsolicitud: any){
    const endpoint = `${base_url}/solicitudes/ ${idsolicitud}`;
    return this.http.get(endpoint);
  }

}
