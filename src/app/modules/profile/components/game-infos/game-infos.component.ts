import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Rule } from 'src/app/models/Rule.model';
import { TimeControl } from 'src/app/models/TimeControl.model';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './game-infos.component.html',
  styleUrls: ['./game-infos.component.scss']
})
export class GameInfosComponent implements OnInit {

  game: Game;

  constructor() { }

  ngOnInit(): void {
    this.game = new Game();
    this.game.BlackPlayer = new User();
    this.game.WhitePlayer = new User();
    this.game.Rule = new Rule();
    this.game.TimeControl = new TimeControl();

    this.game.Date = new Date();
    this.game.Result = 'B+5';
    this.game.BlackPlayer.goTag = 'Player1';
    this.game.WhitePlayer.goTag = 'Player2';
    this.game.BlackRank = 1024;
    this.game.WhiteRank = 968;
    this.game.BlackCapture = 6;
    this.game.WhiteCapture = 12;
    this.game.Size = 9;
    this.game.Komi= 5;
    this.game.Handicap = 2;
    this.game.Rule.RuleName = 'Japanese';
    this.game.TimeControl.Speed = 'Normal';
    this.game.TimeControl.OverTime = 'Byo-Yomi';
  }

}
