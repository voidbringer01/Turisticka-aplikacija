import { Component, Input, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { Znamenitost } from 'src/app/models/znamenitost';
import { Vaznost } from 'src/app/models/vaznost';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Drzava } from 'src/app/models/drzava';
import { Opstina } from 'src/app/models/opstina';
import { ApiService } from 'src/app/services/api.service';
import { ZnamenitostpreviewComponent } from '../znamenitostpreview/znamenitostpreview.component';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent implements OnInit {
  @Input() text:string;
  @Input() znamenitost?:Znamenitost;
  @Input() i?: number;
  @Input() title:string;
  @Output() save = new EventEmitter<number>();
  isModalShow:boolean = false;
  @ViewChild('close') close;
  vaznost:Vaznost[] = [Vaznost.ZNAMENITO,Vaznost.VEOMA_ZNAMENITO,Vaznost.NEZAOBILAZNO] 
  

  drzava:string;
  opstina:string;
  naziv:string;
  opis:string;
  vaz:string;
  lat:string;
  lon:string;
  aktivna:boolean;
  file:string;
  fileSource:string;
  selectedFiles:FileList;

  drzave:Drzava[];
  opstine:Opstina[];
  drzavaIsSelected: boolean = false;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getDrzave().subscribe((drzave)=>this.drzave = drzave)
  }
  drzavaChange(evt){
    if(!this.drzavaIsSelected)
      this.drzavaIsSelected = true
    
    this.opstine = this.drzave.find((drzava)=>drzava.id == evt.target.value).opstine
    
  }

  onSave(){
    
    let v:Vaznost;
    for(let va of this.vaznost){
      if(this.vaz==va)
        v=  va;
    }
    let znam:Znamenitost = {
      naziv:this.naziv,
      opis:this.opis,
      slike:Array.prototype.map.call(this.selectedFiles,(file)=>file.name),
      koordinate:{lat:this.lat,lon:this.lon},
      vaznost:v,
      aktivna:this.aktivna,
      ocene:[]
    };
    this.apiService.addZnamenitost(znam,parseInt(this.drzava),parseInt(this.opstina)).subscribe(resposne=>{
      console.log(resposne)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
      this.save.emit()
      let el: HTMLElement = this.close.nativeElement;
      el.click();
    })
   
  }

  onFileChange(event){
    this.selectedFiles = event.target.files;
    // if (event.target.files.length > 0) {
    //   console.log(event.target.files)
    //   const file = event.target.files[0];
    //   this.myForm.patchValue({
    //     fileSource: file
    //   });
    // }
  }

  upload(file){
    this.apiService.upload(file).subscribe(
      event=>{
        console.log(event)
      }
    )
  }
}
