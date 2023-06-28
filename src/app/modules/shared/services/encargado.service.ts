import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  constructor(private http: HttpClient) { }

  getEncargados(){
    const endpoint = `${ base_url}/encargado`;
    return this.http.get(endpoint);
  }


 saveEncargado(body: any){
 const endpoint =`${base_url}/encargado`;
 return this.http.post(endpoint, body);

 }


 getEncargado(){
  const endpoint = `${ base_url}/encargado`;
  return this.http.get(endpoint);
}

 

updateEncargado(body: any, id: any){
  const endpoint = `${ base_url}/encargado/${id}`;
  return this.http.put(endpoint, body);
}

deleteEncargado(id:any){
  const endpoint = `${ base_url}/encargado/ ${id}`;
  return this.http.delete(endpoint);
}
}
 





