import { Component, Input, OnInit } from '@angular/core';
import { Znamenitost } from 'src/app/models/znamenitost';
import { Ocena } from 'src/app/models/ocena';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { average } from 'src/app/utils/average';
import { apiConfig } from 'src/app/config';

@Component({
  selector: 'app-znamenitost',
  templateUrl: './znamenitost.component.html',
  styleUrls: ['./znamenitost.component.css']
})
export class ZnamenitostComponent implements OnInit {
  @Input() znamenitost:Znamenitost;
  ocene:Ocena[];
  pomSlike:string[] = [];
  prosecnaOcena:number;
  mojaOcena:Ocena;
  uuid:string;
  apiConfig = apiConfig 

  constructor( private apiService:ApiService, private storageService:StorageService) { }

  ngOnInit(): void {
    for(let j =0;j<this.znamenitost.slike.length;j++){
      this.pomSlike.push("uploads/"+this.znamenitost.id+"/"+this.znamenitost.slike[j])
    }
    
    this.uuid = this.storageService.getUserID() 
    this.apiService.getOcenaZnamenitostiByCurrentUser(this.znamenitost.id,this.uuid).subscribe((ocena)=>{
      this.mojaOcena = ocena
    })
    this.handleAverage()
  }

  handleAverage(){
    this.apiService.getProsecnaOcena(this.znamenitost.id).subscribe((ocena)=>{
      console.log(ocena)
      this.prosecnaOcena = ocena
    })
  }

  handleVoting(num){
    if(this.mojaOcena==null){
      let obj:Ocena = {
        idZnamenitosti:this.znamenitost.id,
        potpis:this.uuid,
        ocena:(num+1)
      }
      this.mojaOcena = obj
      this.apiService.addOcena(obj,this.znamenitost.id).subscribe(data =>{
        this.handleAverage()
      })
    }else{
      this.apiService.updateOcena({...this.mojaOcena,ocena:num+1},this.znamenitost.id).subscribe(data=>{
        this.mojaOcena.ocena = num+1
        this.handleAverage()
      })

    }
  }

}
