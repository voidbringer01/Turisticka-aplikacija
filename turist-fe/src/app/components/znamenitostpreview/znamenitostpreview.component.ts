import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { apiConfig } from 'src/app/config';
import { Ocena } from 'src/app/models/ocena';
import { Znamenitost } from 'src/app/models/znamenitost';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-znamenitostpreview',
  templateUrl: './znamenitostpreview.component.html',
  styleUrls: ['./znamenitostpreview.component.css']
})
export class ZnamenitostpreviewComponent implements OnInit {
  znamenitost:Znamenitost;
  id:number;
  ocene:Ocena[];
  prosecnaOcena:number;
  mojaOcena:Ocena;
  uuid:string;
  pomSlike:string[] = [];
  apiConfig = apiConfig

  constructor(private route: ActivatedRoute, private apiService:ApiService,  private storageService:StorageService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.id = parseInt(params['id'])
      this.apiService.getZnamenitostById(this.id).subscribe((znamenitost)=>{
        if(znamenitost==null)
          this.router.navigate(['/'])
        else{
          this.znamenitost = znamenitost
          let pomArr = []
          for(let j =0;j<this.znamenitost.slike.length;j++){
            pomArr.push("uploads/"+this.znamenitost.id+"/"+this.znamenitost.slike[j])
          }
          this.pomSlike = pomArr
          this.uuid = this.storageService.getUserID() 
          this.apiService.getOcenaZnamenitostiByCurrentUser(this.znamenitost.id,this.uuid).subscribe((ocena)=>{
            this.mojaOcena = ocena
          })
          this.handleAverage()
        }
      })
      
    })

    
  }

  handleAverage(){
    this.apiService.getProsecnaOcena(this.znamenitost.id).subscribe((ocena)=>{
      this.prosecnaOcena = ocena
    })
  }

  handleVoting(num){
    console.log(this.mojaOcena)
    if(this.mojaOcena == null || isNaN(this.mojaOcena.ocena)){
      this.mojaOcena = {
        potpis:this.uuid,
        ocena:num+1
      }
      let obj:Ocena = {
        potpis:this.uuid,
        ocena:(this.mojaOcena.ocena)
      }
      this.apiService.addOcena(obj,this.znamenitost.id).subscribe(data =>{
        this.handleAverage()
      })
    }else{
      this.apiService.updateOcena({...this.mojaOcena,ocena:num+1},this.znamenitost.id).subscribe(data=>{
        this.handleAverage()
      })

    }
  }

}
