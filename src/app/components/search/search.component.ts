import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = FormGroup;
  searchMatch: any = {};
  constructor(private matchService: MatchService) { }

  ngOnInit() {
  }


  searchMatchScore() {
    
    
    this.matchService.searchMatchByScore(this.searchMatch).subscribe(
      (response) => {
        console.log("here response from BE", response);

      }
    );
  }
}
