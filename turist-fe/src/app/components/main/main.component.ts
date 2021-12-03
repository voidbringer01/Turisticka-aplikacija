import { Component, OnInit } from '@angular/core';
import { Drzava } from 'src/app/models/drzava';
import { Opstina } from 'src/app/models/opstina';
import { Vaznost } from 'src/app/models/vaznost';
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
    vaznost:Vaznost.ZNAMENITO
    },
    {
    vaznost:Vaznost.VEOMA_ZNAMENITO
    },
    {
    vaznost:Vaznost.NEZAOBILAZNO
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
      this.opstine = this.drzave.find((drzava)=>drzava.id == evt.target.value).opstine
    
  }
  opstinaChange(){
    this.opstinaIsSelected = true
  }
  getZnamenitosti(){
    this.znamenitosti = this.opstine.find((opstina)=>opstina.id == parseInt(this.selektovaniIdOpstine)).znamenitosti
    console.log(this.znamenitosti)
    this.prikazaneZnamenitosti = true
  }

  // cb1 - znamenito, cb2 - veoma znamenito, cb3 - nezaobilazno, search - query string 
  searchZnamenitosti(searchObj:{cb1:boolean,cb2:boolean,cb3:boolean,search:string}){
    let filterArr:Vaznost[] = [];
    if(searchObj?.cb1 == true)
      filterArr.push(Vaznost.ZNAMENITO)
      
    if(searchObj?.cb2 == true)
      filterArr.push(Vaznost.VEOMA_ZNAMENITO)
    
    if(searchObj?.cb3 == true)
      filterArr.push(Vaznost.NEZAOBILAZNO)

    this.apiService.getZnamenitostiByName(searchObj.search).subscribe(
      (znamenitosti) => {
        this.znamenitosti =  znamenitosti.filter(
                              (znamenitost)=>filterArr.indexOf(znamenitost.vaznost)!=-1)

        if(this.znamenitosti.length > 0)
          this.prikazaneZnamenitosti = true
        else
          this.prikazaneZnamenitosti = false
      })
  }
}
