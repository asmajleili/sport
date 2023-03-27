import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  titre = "Math information"
  match: any = {}
  id: any;
  matches: any = [

  ];
  constructor(private activatedRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
   // get id value from actif path
     this.id = this.activatedRoute.snapshot.paramMap.get("id")
  
    this.matchService.getMatchById(this.id).subscribe(
      (responce) => {
        this.match = responce.findedMatch
      }
    )


  }

}
