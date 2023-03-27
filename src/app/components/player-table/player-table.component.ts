import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {
player:any;




  constructor(private router:Router,
    private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getAllPlayer().subscribe(
      (responce)=> {
        this.player=responce.players
        }
    )
  }

  displayPlayer(id:number) {
    this.router.navigate([`playerInfo/${id}`]);
  }

  editPlayer(id) {
    alert("Edit " + id);
  }

  deletePlayer(id) {
    alert("Delete " + id);
  }


  

}
