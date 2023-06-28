import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  constructor(private http: HttpClient) { }



  getTipoDoc(){
    const endpoint = `${base_url}/tipodoc`;
    return this.http.get(endpoint);
  }



  


 saveEncargado(body: any){
 const endpoint =`${base_url}/tipodoc`;
 return this.http.post(endpoint, body);

 }


 getEncargado(){
  const endpoint = `${ base_url}/tipodoc`;
  return this.http.get(endpoint);
}

 

updateEncargado(body: any, id: any){
  const endpoint = `${ base_url}/tipodoc/${id}`;
  return this.http.put(endpoint, body);
}

delete(id:any){
  const endpoint = `${ base_url}/tipodoc/ ${id}`;
  return this.http.delete(endpoint);
}

}
