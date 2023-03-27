import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm = FormGroup;
  match: any = {};
  matches: any = [];
  id: any;
  titre = "Edit match";
  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {


    // get id from path
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.matchService.getMatchById(this.id).subscribe(
      (response) => {
        this.match = response.findedMatch;
      }
    );
  }

  editMatch() {
    console.log("here new match", this.match);
    this.matchService.editMatch(this.match).subscribe(

      (response) => {

        console.log("here message", response.message);
        this.router.navigate(["Admin"]);
      }


    );





  }

}
