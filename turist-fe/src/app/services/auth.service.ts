import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserFormData } from '../models/user';
import {apiConfig} from '../config'
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated:boolean = false;

  constructor(private http:HttpClient) { }

  isAuthenticated(){
    return this.authenticated;
  }

  loginUser(user:UserFormData){
    this.authenticated = true
    return of(this.authenticated)
  }

  logout(){
    this.authenticated = false
    return of(this.authenticated)
  }

  // todo: Srediti kada se sredi backend
  registerUser(user:User){
    return 
  }

  setAuthToken(token:string){
    localStorage.setItem('token',token)
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }

  clearAuthToken(){
    localStorage.removeItem('token')
  }
}
