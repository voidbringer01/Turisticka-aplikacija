import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  num:number = 1
  dodato:boolean = false
  editovano:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  dodaj(){
    this.dodato = true
    setTimeout(()=>{
      this.dodato= false
    },4000)
  }

  edituj(){
    this.editovano = true
    setTimeout(()=>{
      this.editovano= false
    },4000)
  }

  paginationHandle(num){
    this.num = num
    console.log(this.num)
  }
}
