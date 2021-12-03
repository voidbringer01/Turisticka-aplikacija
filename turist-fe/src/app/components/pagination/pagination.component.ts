import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<number>();
  i:number = 1;
  max:number = 100;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.countZnamenitosti().subscribe(val=>{
      this.max = Math.ceil(val/5)
    })
  }

  next(evt){
    evt.preventDefault()    
    if(this.i<this.max){
      this.i++;
      this.pageEvent.emit(this.i)
    }
  }

  previous(evt){
    
    evt.preventDefault()
    if(this.i>1){
      this.i--;
      this.pageEvent.emit(this.i)
    }
  }

}
