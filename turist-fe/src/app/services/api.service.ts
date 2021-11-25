import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {apiConfig} from '../config'
import { Drzava } from '../models/drzava';
import { Opstina } from '../models/opstina';
import { Znamenitost } from '../models/znamenitost';
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
}
