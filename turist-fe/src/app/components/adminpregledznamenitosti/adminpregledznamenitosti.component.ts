import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ocena } from 'src/app/models/ocena';
import { Znamenitost } from 'src/app/models/znamenitost';
import { ApiService } from 'src/app/services/api.service';
import {average} from 'src/app/utils/average'
@Component({
  selector: 'app-adminpregledznamenitosti',
  templateUrl: './adminpregledznamenitosti.component.html',
  styleUrls: ['./adminpregledznamenitosti.component.css']
})
export class AdminpregledznamenitostiComponent implements OnInit {
  znamenitosti:Znamenitost[];
  showToolTip:string[];
  @Input() num:number = 1
  @Output() onEdit = new EventEmitter<void>();
  constructor(private apiService:ApiService) { }

  ngOnChanges(){
    this.apiService.getAllZnamenitosti(this.num).subscribe(znamenitosti=>{
      this.znamenitosti = znamenitosti
      for(let i = 0;i<this.znamenitosti.length;i++){
        for(let j =0;j<this.znamenitosti[i].slike.length;j++){
          this.znamenitosti[i].slike[j] = "uploads/"+this.znamenitosti[i].id+"/"+this.znamenitosti[i].slike[j]
        }
      }

      this.showToolTip = Array(this.znamenitosti.length).fill("none");
    })
  }

  ngOnInit(): void {
    this.apiService.getAllZnamenitosti(this.num).subscribe(znamenitosti=>{
      this.znamenitosti = znamenitosti
      console.log('ON INIT')
      console.log(this.znamenitosti)

      for(let i = 0;i<this.znamenitosti.length;i++){
        for(let j =0;j<this.znamenitosti[i].slike.length;j++){
          this.znamenitosti[i].slike[j] = "uploads/"+this.znamenitosti[i].id+"/"+this.znamenitosti[i].slike[j]
        }
      }

     
      console.log(this.znamenitosti)
      this.showToolTip = Array(this.znamenitosti.length).fill("none");
    })
  }
  formatOcene(ocene){ 

    return average(ocene.map(ocena=>ocena.ocena))
  }

  prikaziOcene(ocene){
    let str = "Ocene: \n";
    let oc = ocene.map(ocene=>ocene.ocena)
    oc.forEach(ocena=>{
      str+=ocena.toString()+" ";
    })
    return str;
  }

  mouseIn(i){
    this.showToolTip[i]="block";
  }
  mouseOut(i){
    this.showToolTip[i]="none";
  }

  deaktiviraj(i){
    this.znamenitosti[i].aktivna = !this.znamenitosti[i].aktivna
    
    this.apiService.promeniAktivnostZnamenitosti(this.znamenitosti[i].id).subscribe(res=>{
      console.log(res)
    })
  }
  
  edituj(){
    this.apiService.getAllZnamenitosti(this.num).subscribe(znamenitosti=>{
      this.znamenitosti = znamenitosti
      for(let i = 0;i<this.znamenitosti.length;i++){
        for(let j =0;j<this.znamenitosti[i].slike.length;j++){
          this.znamenitosti[i].slike[j] = "uploads/"+this.znamenitosti[i].id+"/"+this.znamenitosti[i].slike[j]
        }
      }
      // for(let i = 0;i<this.znamenitosti.length;i++){
      //   for(let j =0;j<this.znamenitosti[i].slike.length;j++){
      //     let arr = this.znamenitosti[i].slike[j].split('/')
      //     this.znamenitosti[i].slike[j] = arr[0]+'/'+this.znamenitosti[i].id+arr[1]
      //   }
      // }

      this.showToolTip = Array(this.znamenitosti.length).fill("none");
    })
    this.onEdit.emit()
  }
}
