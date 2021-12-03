import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
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
  countZnamenitosti() {
    return this.http.get<number>(`${apiConfig.url}/count-znamenitosti`)
  }

  constructor(private http:HttpClient) { }

  getDrzave(){
    return this.http.get<Drzava[]>(`${apiConfig.url}/drzave`)
  }

  getZnamenitostById(id:number){
    return this.http.get<Znamenitost>(`${apiConfig.url}/znamenitost/${id}`)
  }
  getProsecnaOcena(id:number){
    return this.http.get<number>(`${apiConfig.url}/prosecnaocena/${id}`)
  }
  getOcenaZnamenitostiByCurrentUser(idZnamenitosti:number,potpis:string){
    
    return this.http.get<Ocena>(`${apiConfig.url}/ocena/${idZnamenitosti}/${potpis}`) 
  }
  getZnamenitostiByName(name:string){
    return this.http.get<Znamenitost[]>(`${apiConfig.url}/znamenitosti/${name}`)
  }

  addOcena(ocena:Ocena,id:number){
    return this.http.post<Ocena>(`${apiConfig.url}/ocena/${id}`,ocena)
  }
  updateOcena(ocena:Ocena,id:number){
    return this.http.put<Ocena>(`${apiConfig.url}/ocena/${id}`,ocena)
  }

  getAllZnamenitosti(num){
    return this.http.get<Znamenitost[]>(`${apiConfig.url}/znamenitosti/page/${num}`)
  }

  promeniAktivnostZnamenitosti(id){
    return this.http.put<any>(`${apiConfig.url}/promeni-aktivnost/${id}`,null)
  }

  addZnamenitost(znamenitost:Znamenitost,idDrzave:number,idOpstine:number){
    return this.http.post<any>(`${apiConfig.url}/znamenitosti/${idDrzave}/${idOpstine}`,znamenitost)
  }
  editZnamenitost(znamenitost:Znamenitost){
    return this.http.put<any>(`${apiConfig.url}/znamenitosti`,znamenitost)
  }

  upload(file:File){
    const formData:FormData = new FormData()
    formData.append('file',file)
    
    const req = new HttpRequest('POST',`${apiConfig.url}/upload`,formData,{
      responseType:'json'
    }) 
    return this.http.request(req)
  }
}
