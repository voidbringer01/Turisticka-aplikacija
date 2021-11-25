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
  }
}
