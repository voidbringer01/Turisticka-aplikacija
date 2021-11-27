import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {apiConfig} from '../config'
import { Drzava } from '../models/drzava';
import { Opstina } from '../models/opstina';
import { Znamenitost } from '../models/znamenitost';
import { Ocena } from '../models/ocena';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getDrzave(){
    return this.http.get<Drzava[]>(`${apiConfig.url}/drzave`)
  }
  getOpstine(){
    return this.http.get<Opstina[]>(`${apiConfig.url}/opstine`)
  }
  getZnamenitosti(){
    return this.http.get<Znamenitost[]>(`${apiConfig.url}/znamenitosti`)
  }
  getZnamenitostById(id:string){
    return this.http.get<Znamenitost>(`${apiConfig.url}/znamenitosti/${id}`)
  }
  // todo: Resolve this on server side, on client side we will only receive average 
  getOceneByID(id:string){ 
    return this.http.get<Ocena[]>(`${apiConfig.url}/ocene`) // Ruta treba biti /prosecnaocena/:idznamenitosti ili nesto slicno, ali zbog ogranicenja json-servera moram ovako za sad
  }
  getOcenaZnamenitostiByCurrentUser(uuid:string){
    // todo: Resolve on server side
    return this.http.get<Ocena[]>(`${apiConfig.url}/ocene`) // Ruta treba biti /ocene/:idznamenitosti/:idkorisnika ili nesto slicno, ali zbog ogranicenja json-servera moram ovako za sad
  }

  addOcena(ocena:Ocena){
    return this.http.post<Ocena>(`${apiConfig.url}/ocene`,ocena)
  }
  updateOcena(ocena:Ocena){
    return this.http.put<Ocena>(`${apiConfig.url}/ocene/${ocena.id}`,ocena)
  }

}
