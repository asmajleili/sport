import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  playerForm : FormGroup;

  // object
  player: any = {};

  constructor(private playerServise:PlayerService) { }

  ngOnInit() {
  }

  addPlayer() {
    console.log("here match object", this.player);
    // appel servise addMatch
   this.playerServise.addPlayer(this.player).subscribe(
    (response)=>{
      console.log("here response from BE",response);
      
    }
   );

  }

}
