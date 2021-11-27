import { Injectable } from '@angular/core';
import * as uuid from 'uuid'
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Work around not logged users(alowing not logged users to preview their voting)
  getUserID(){
    if(!localStorage.getItem('userid')){
      const myuuid = uuid.v4()
      localStorage.setItem('userid',myuuid)
    }
    return localStorage.getItem('userid')
  }
}
