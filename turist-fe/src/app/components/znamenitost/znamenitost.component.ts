import { Component, Input, OnInit } from '@angular/core';
import { Znamenitost } from 'src/app/models/znamenitost';
import { Ocena } from 'src/app/models/ocena';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { average } from 'src/app/utils/average';

@Component({
  selector: 'app-znamenitost',
  templateUrl: './znamenitost.component.html',
  styleUrls: ['./znamenitost.component.css']
})
export class ZnamenitostComponent implements OnInit {
  @Input() znamenitost:Znamenitost;
  ocene:Ocena[];
  prosecnaOcena:number;
  mojaOcena:Ocena;
  uuid:string;

  constructor( private apiService:ApiService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.uuid = this.storageService.getUserID() 
    this.apiService.getOcenaZnamenitostiByCurrentUser(this.uuid).subscribe((ocene)=>{
      this.mojaOcena = ocene.find((ocena)=>ocena.idZnamenitosti==this.znamenitost.id && ocena.idKorisnika==this.uuid)
    })
    this.handleAverage()
  }

  handleAverage(){
    this.apiService.getOceneByID(this.znamenitost.id).subscribe((ocene)=>{
      this.ocene = ocene.filter((ocena)=>ocena.idZnamenitosti===this.znamenitost.id)
      this.prosecnaOcena = average(this.ocene.map((ocena)=>ocena.ocena))
    })
  }

  handleVoting(num){
    if(isNaN(this.mojaOcena.ocena)){
      this.mojaOcena.ocena = num
      let obj:Ocena = {
        idZnamenitosti:this.znamenitost.id,
        idKorisnika:this.uuid,
        ocena:(this.mojaOcena.ocena+1)
      }
      this.apiService.addOcena(obj).subscribe(data =>{
        this.handleAverage()
      })
    }else{
      this.apiService.updateOcena({...this.mojaOcena,ocena:num+1}).subscribe(data=>{
        
        this.handleAverage()
      })

    }
  }

}
