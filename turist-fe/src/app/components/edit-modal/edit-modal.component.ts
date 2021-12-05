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
  errors = {
    naziv:'',
    opis:'',
    vaznost:'',
    koordinate  :{
      lat:'',
      lon:''
    },
    slike  :'',
  }

  // drzava:number;
  // opstina:number;
  // naziv:string;
  // opis:string;
  // vaz:string;
  // lat:string;
  // lon:string;
  // aktivna:boolean;
  file:string;
  fileSource:string;
  selectedFiles:FileList;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  validateForm(){
    let x = true

    if(this.znamenitost.naziv==undefined || this.znamenitost.naziv==''){
      this.errors.naziv = 'Morate uneti naziv'
      x = false
    }else if(this.znamenitost.naziv.length<3 || this.znamenitost.naziv.length>20){
      this.errors.naziv = 'Naziv mora biti veci od 3 karaktera a manji od 20'
      x = false
    }else if(!/^[a-zA-Z\s]+$/.test(this.znamenitost.naziv)){
      this.errors.naziv = 'Naziv sme sadrzati samo slova i razmake'
      x = false
    }else{
      this.errors.naziv = ''
    }

    if(this.znamenitost.opis==undefined || this.znamenitost.opis==''){
      this.errors.opis = 'Morate uneti opis'
      x = false
    }else if(this.znamenitost.opis.length<3 || this.znamenitost.opis.length>500){
      this.errors.opis = 'Opis mora biti veci od 3 karaktera a manji od 500'
      x = false
    }else if(!/^[a-zA-Z0-9\s.!?]+$/.test(this.znamenitost.opis)){
      this.errors.opis = 'opis sme sadrzati samo slova, brojeve, razmake i znakove .?!'
      x = false
    }else{
      this.errors.opis = ''
    }

    if(this.znamenitost.vaznost==undefined){
      this.errors.vaznost='vaznost mora biti izabrana'
      x = false
    }else{
      this.errors.vaznost = ''
    }

    if(this.znamenitost.koordinate.lat==undefined || this.znamenitost.koordinate.lat==''){
      this.errors.koordinate.lat = 'Lat mora biti postavljen.'
      x = false
    }else{
      this.errors.koordinate.lat = ''
    }
    if(this.znamenitost.koordinate.lon==undefined || this.znamenitost.koordinate.lon==''){
      this.errors.koordinate.lon = 'lon mora biti postavljen.'
      x = false
    }else{
      this.errors.koordinate.lon = ''
    }
    if(this.znamenitost.slike.length==0 && this.selectedFiles==undefined){
      this.errors.slike = 'Mora postojati barem jedna slika. Dodajte sliku.'
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
      if(this.selectedFiles?.length>=1){
        
        this.znamenitost.slike = [...this.znamenitost.slike.map(slika=>slika.split('/')[2]), ...Array.prototype.map.call(this.selectedFiles,(file)=>file.name)]
        console.log(this.znamenitost.slike)
        console.log(this.znamenitost)
      }
      else{
        this.znamenitost.slike = [...this.znamenitost.slike.map(slika=>slika.split('/')[2])]
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
  }

  onFileChange(event){
    this.selectedFiles = event.target.files;
  
  }

  upload(file){
    console.log(this.znamenitost.id)
    this.apiService.upload(file,this.znamenitost.id.toString()).subscribe(
      event=>{
        console.log(event)
      }
    )
  }
  remove(slika){
    console.log(slika)
    this.znamenitost.slike = this.znamenitost.slike.filter(sl=>sl!=slika)
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
