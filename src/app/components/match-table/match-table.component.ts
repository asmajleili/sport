import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.css']
})
export class MatchTableComponent implements OnInit {
  match: any = [];

  constructor(private router: Router,
   private matchService:MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (responce)=> {
      this.match=responce.matches
      }
    )
  }


  displayMatch(id: number) {
    this.router.navigate([`matchInfo/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`editMatch/${id}`]);
  }

  deleteMatch(id) {

    this.matchService.deleteMatchById(id).subscribe( 
      (response)=>{
      console.log("here response from BE",response.message);
      this.matchService.getAllMatches().subscribe(
        (responce)=> {
        this.match=responce.matches
        }
      )
    }
    );

      
   
  }
}


