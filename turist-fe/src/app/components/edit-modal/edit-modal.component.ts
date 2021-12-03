import { Component, Input, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { Drzava } from 'src/app/models/drzava';
import { Opstina } from 'src/app/models/opstina';
import { Vaznost } from 'src/app/models/vaznost';
import { Znamenitost } from 'src/app/models/znamenitost';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() text:string;
  @Input() znamenitost?:Znamenitost;
  @Input() i?: number;
  @Input() title:string;
  @Output() save = new EventEmitter<number>();
  isModalShow:boolean = false;
  @ViewChild('close') close;
  vaznost:Vaznost[] = [Vaznost.ZNAMENITO,Vaznost.VEOMA_ZNAMENITO,Vaznost.NEZAOBILAZNO] 
  

  drzava:number;
  opstina:number;
  naziv:string;
  opis:string;
  vaz:string;
  lat:string;
  lon:string;
  aktivna:boolean;
  file:string;
  fileSource:string;
  selectedFiles:FileList;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }


  onSave(){
    if(this.selectedFiles?.length>=1){
      this.znamenitost.slike = [...this.znamenitost.slike, ...Array.prototype.map.call(this.selectedFiles,(file)=>"uploads/"+file.name)]
    }
    this.apiService.editZnamenitost(this.znamenitost).subscribe(res=>{
      
      if(this.selectedFiles && this.selectedFiles.length>=1){
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(this.selectedFiles[i]);
        }
      }
      
      let el: HTMLElement = this.close.nativeElement;
      this.save.emit()
      el.click();
    })
  }

  onFileChange(event){
    this.selectedFiles = event.target.files;
  
  }

  upload(file){
    this.apiService.upload(file).subscribe(
      event=>{
        console.log(event)
      }
    )
  }
  remove(slika){
    this.znamenitost.slike = this.znamenitost.slike.filter(sl=>sl!=slika)
  }

}
