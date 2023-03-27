import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogTable=[

    {titre:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.",name:"Romolu to stay at Real Nadrid?",date:"May 20, 2020<",
  img:"assets/images/img_1.jpg"},
  {titre:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.",name:"Romolu to stay at Real Nadrid?",date:"May 20, 2020<",
  img:"assets/images/img_1.jpg"},
  {titre:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.",name:"Romolu to stay at Real Nadrid?",date:"May 20, 2020<",
  img:"assets/images/img_1.jpg"}





  ];
  constructor() { }

  ngOnInit() {
  }

}
