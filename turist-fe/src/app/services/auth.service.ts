import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserFormData } from '../models/user';
import {apiConfig} from '../config'
import {BehaviorSubject, of} from 'rxjs';
import{tap} from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = new BehaviorSubject<boolean>(false);
  authenticated = this.auth.asObservable();
  loggedUser:string;
  constructor(private http:HttpClient) { 
  }

  setAuth(){
    this.isAuthenticated().subscribe(asd=>{
      this.auth.next(true)
    },
    error=>this.auth.next(false)
    )
  }

  isAuthenticated(){
    if(!!this.getLoggedUser())
      return of(false);
    
    return this.http.post<any>(`${apiConfig.authUrl}/isauthenticated`,{username:this.getLoggedUser()},httpOptions)
  }

  loginUser(user:UserFormData){
    return this.http.post<any>(`${apiConfig.authUrl}/login`,user,httpOptions).pipe(tap(data=>{
      this.doLoginUser(user.username,data)
    }))
  }

  registerUser(user:UserFormData){
    console.log(user)
    return this.http.post<any>(`${apiConfig.authUrl}/register`,user,httpOptions)
  }

  logout(){
     this.clearAuthToken()
     this.clearLoggedUser()
     return of(!!this.getAuthToken())
  }

  setAuthToken(token:string){
    localStorage.setItem('token',token)
  }

  setLoggedUser(username:string){
    localStorage.setItem('user',username)
  }

  getLoggedUser(){
    return localStorage.getItem('user')
  }

  clearLoggedUser(){
    localStorage.removeItem('user')
    this.auth.next(false)
    this.loggedUser = null
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }

  clearAuthToken(){
    localStorage.removeItem('token')
  }

  doLoginUser(username,token){
    this.auth.next(true)
    this.loggedUser = username
    this.setLoggedUser(username)
    this.setAuthToken(token.token)
  }
}
