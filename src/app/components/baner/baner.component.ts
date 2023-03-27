import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-baner',
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css']
})
export class BanerComponent implements OnInit {
  @Input()x:any;
  constructor() { }

  ngOnInit() {
  }

}


