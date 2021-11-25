import { Component, Input, OnInit } from '@angular/core';
import { Znamenitost } from 'src/app/models/znamenitost';

@Component({
  selector: 'app-znamenitost',
  templateUrl: './znamenitost.component.html',
  styleUrls: ['./znamenitost.component.css']
})
export class ZnamenitostComponent implements OnInit {
  @Input() znamenitost:Znamenitost;
  constructor() { }

  ngOnInit(): void {
  }

}
