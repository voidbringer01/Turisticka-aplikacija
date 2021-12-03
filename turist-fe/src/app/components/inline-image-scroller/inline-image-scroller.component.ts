import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { apiConfig } from 'src/app/config';

@Component({
  selector: 'app-inline-image-scroller',
  templateUrl: './inline-image-scroller.component.html',
  styleUrls: ['./inline-image-scroller.component.css']
})
export class InlineImageScrollerComponent implements OnInit {
  @Input() slike:string[];
  @Input() type:string;
  @Input() mw:string;
  current:number = 0;
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft
  leftDisabled:boolean = true;
  rightDisabled:boolean = false;
  apiConfig = apiConfig
  constructor() { }

  ngOnInit(): void {
    if(this.slike.length==1)
      this.rightDisabled = true
  }

  format(url){
    let x = url.split('/')
    let y = x[x.length-1]
    let z = y.split('.')
    return z[0]
  }

  goRight(){
    if(this.slike.length>1){
      if(!this.rightDisabled){
        this.current+=1
        if(this.current== this.slike.length-1)
          this.rightDisabled=true
        this.leftDisabled = false
      }
    }
  }
  goLeft(){
    if(this.slike.length>1){
      if(!this.leftDisabled){
        this.current--
        if(this.current == 0)
          this.leftDisabled = true
        this.rightDisabled = false
      }
    }
  }
}
