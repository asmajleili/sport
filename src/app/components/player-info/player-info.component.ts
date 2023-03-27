import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  // @Input() x: any;
  player: any = {}
  id: any;
  players: any = [

  ];
  constructor(private activatedRoute: ActivatedRoute,
    private playerService : PlayerService) { }

  ngOnInit() {
   // get id value from actif path
     this.id = this.activatedRoute.snapshot.paramMap.get("id")
  
    this.playerService.getPlayerById(this.id).subscribe(
      (responce) => {
        this.player = responce.player;
      }
    )


  }

}
