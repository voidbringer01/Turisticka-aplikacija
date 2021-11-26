import { Component, OnInit } from '@angular/core';
import { Drzava } from 'src/app/models/drzava';
import { Opstina } from 'src/app/models/opstina';
import { Znamenitost } from 'src/app/models/znamenitost';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  drzave:Drzava[];
  opstine:Opstina[];
  znamenitosti:Znamenitost[];
  drzavaIsSelected: boolean = false;
  opstinaIsSelected: boolean = false;
  selektovaniIdOpstine: string ="-1";
  prikazaneZnamenitosti: boolean = false
  filterargs:Object[] = [
    {
    vaznost:"znamenito"
    },
    {
    vaznost:"veoma znamenito"
    },
    {
    vaznost:"nezaobilazno"
    }
  ] 
  // todo: Prikaz vaznosti kategorija treba prepraviti
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDrzave().subscribe((drzave)=>this.drzave = drzave)
  }

  drzavaChange(evt){
    if(!this.drzavaIsSelected)
      this.drzavaIsSelected = true
    else{
      this.opstinaIsSelected = false
      this.selektovaniIdOpstine = "-1"
    }
      this.apiService.getOpstine().subscribe((opstine)=>this.opstine = opstine.filter((opstina)=>opstina.idDrzave===evt.target.value))
    
  }
  opstinaChange(){
    this.opstinaIsSelected = true
  }
  getZnamenitosti(){
    this.apiService.getZnamenitosti().subscribe(
      (znamenitosti)=>this.znamenitosti = znamenitosti.filter((znamenitost)=>znamenitost.idOpstine===this.selektovaniIdOpstine))
    this.prikazaneZnamenitosti = true
  }

  // cb1 - znamenito, cb2 - veoma znamenito, cb3 - nezaobilazno, search - query string 
  searchZnamenitosti(searchObj:{cb1:boolean,cb2:boolean,cb3:boolean,search:string}){
    let filterArr = [];
    if(searchObj?.cb1 == true)
      filterArr.push("znamenito")
      
    if(searchObj?.cb2 == true)
      filterArr.push("veoma znamenito")
    
    if(searchObj?.cb3 == true)
      filterArr.push("nezaobilazno")

    // todo: Handle search on backend 
    this.apiService.getZnamenitosti().subscribe(
      (znamenitosti) => {
        this.znamenitosti =  znamenitosti.filter(
                              (znamenitost)=>filterArr.indexOf(znamenitost.vaznost)!=-1 && znamenitost.naziv.includes(searchObj.search) )
        if(this.znamenitosti.length > 0)
          this.prikazaneZnamenitosti = true
        else
          this.prikazaneZnamenitosti = false
      })
    console.log(searchObj)
  }
}
