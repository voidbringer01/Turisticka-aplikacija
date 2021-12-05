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
  
  errors = {
    drzava:'',
    opstina:'',
    naziv:'',
    opis:'',
    vaznost:'',
    koordinate  :{
      lat:'',
      lon:''
    },
    slike  :'',
  }

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

  validateForm(){
    let x = true

    if(this.drzava==undefined){
      this.errors.drzava='Drzava mora biti izabrana.'
      x = false;
    }else{
      this.errors.drzava=''
    }

    if(this.opstina==undefined){
      this.errors.opstina='Opstina mora biti izabrana'
      x = false
    }else{
      this.errors.opstina = ''
    }

    if(this.naziv==undefined || this.naziv==''){
      this.errors.naziv = 'Morate uneti naziv'
      x = false
    }else if(this.naziv.length<3 || this.naziv.length>20){
      this.errors.naziv = 'Naziv mora biti veci od 3 karaktera a manji od 20'
      x = false
    }else if(!/^[a-zA-Z\s]+$/.test(this.naziv)){
      this.errors.naziv = 'Naziv sme sadrzati samo slova i razmake'
      x = false
    }else{
      this.errors.naziv = ''
    }

    if(this.opis==undefined || this.opis==''){
      this.errors.opis = 'Morate uneti opis'
      x = false
    }else if(this.opis.length<3 || this.opis.length>500){
      this.errors.opis = 'Opis mora biti veci od 3 karaktera a manji od 500'
      x = false
    }else if(!/^[a-zA-Z0-9\s.!?]+$/.test(this.opis)){
      this.errors.opis = 'opis sme sadrzati samo slova, brojeve, razmake i znakove .?!'
      x = false
    }else{
      this.errors.opis = ''
    }

    if(this.vaz==undefined){
      this.errors.vaznost='vaznost mora biti izabrana'
      x = false
    }else{
      this.errors.vaznost = ''
    }

    if(this.lat==undefined || this.lat==''){
      this.errors.koordinate.lat = 'Lat mora biti postavljen.'
      x = false
    }else{
      this.errors.koordinate.lat = ''
    }
    if(this.lon==undefined || this.lon==''){
      this.errors.koordinate.lon = 'lon mora biti postavljen.'
      x = false
    }else{
      this.errors.koordinate.lon = ''
    }

    if(this.selectedFiles==undefined){
      this.errors.slike = 'Izaberite sliku.'
      x = false
    }else{
      this.errors.slike=''
    }

    


    return x;
  }

  limitLat(evt){
    if(evt.target.value>90)
      evt.target.value = 90
    if(evt.target.value<-90)
      evt.target.value = -90
  }

  limitLon(evt){
    if(evt.target.value>80)
      evt.target.value = 80
    if(evt.target.value<-180)
      evt.target.value = -180
  }

  onSave(){
    if(this.validateForm()){
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
        
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(this.selectedFiles[i],resposne.id.toString());
        }
        this.save.emit()
        let el: HTMLElement = this.close.nativeElement;
        el.click();
      })
    }
   
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

  upload(file,id){
    this.apiService.upload(file,id).subscribe(
      event=>{
        console.log(event)
      }
    )
  }

  resetErrors(){
    for(let prop in this.errors){
      if(prop == 'koordinate'){
        this.errors[prop].lat = ''
        this.errors[prop].lon = ''
      }else
        this.errors[prop] = ''
    }
  }
}
