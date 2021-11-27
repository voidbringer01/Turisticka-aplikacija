import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  faSearch = faSearch;
  cb1:boolean;
  cb2:boolean;
  cb3:boolean;
  search:string;
  @Output() searchEvent = new EventEmitter<{cb1:boolean,cb2:boolean,cb3:boolean,search:string}>()

  constructor() { }

  ngOnInit(): void {
  }

 handleSearch(){
   
  this.searchEvent.emit({cb1:this.cb1,cb2:this.cb2,cb3:this.cb3,search:this.search})
 }

}
