import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnInit {
  team: any = [



  ];
  constructor(private teamService: TeamService,
   private router:Router) { }

  ngOnInit() {
    this.teamService.getAllTeam().subscribe(
      (data) => {
        this.team = data.teams
      }
    )
  }


  displayTeam(id: number) {
    
    this.router.navigate([`teamInfo/${id}`]);
  }

  editTeam(id) {
    alert("Edit " + id);
  }

  deleteTeam(id) {
    this.teamService.deleteTeam(id).subscribe(
      (response) => {
        console.log("here response after delete", response.message);
        this.teamService.getAllTeam().subscribe(
          (data) => {
            this.team = data.teams
          });
      });
  }


}
