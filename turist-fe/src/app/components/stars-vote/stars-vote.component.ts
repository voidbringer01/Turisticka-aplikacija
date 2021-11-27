import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stars-vote',
  templateUrl: './stars-vote.component.html',
  styleUrls: ['./stars-vote.component.css']
})
export class StarsVoteComponent implements OnInit {
  faStar = faStar;
  hoverNum:number;
  @Input() current:number;
  @Output() vote = new EventEmitter<number>();
  color:string = "grey";
  constructor() { }

  ngOnInit(): void {
  }

  mouseEnter(num){
    this.hoverNum = num
  }
  mouseClick(num){
    this.current = num
    this.vote.emit(this.current)
  }
  mouseLeave(){
    this.hoverNum = -1;
  }

}
