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
      this.showToolTip = Array(this.znamenitosti.length).fill("none");
    })
  }

  ngOnInit(): void {
    this.apiService.getAllZnamenitosti(this.num).subscribe(znamenitosti=>{
      this.znamenitosti = znamenitosti
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
  
  edituj(i){
    this.onEdit.emit()
  }
}
