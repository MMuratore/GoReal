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
    this.game.blackPlayer = new User();
    this.game.whitePlayer = new User();
    this.game.rule = new Rule();
    this.game.timeControl = new TimeControl();

    this.game.startDate = new Date();
    this.game.result = 'B+5';
    this.game.blackPlayer.goTag = 'Player1';
    this.game.whitePlayer.goTag = 'Player2';
    this.game.blackRank = 1024;
    this.game.whiteRank = 968;
    this.game.blackCapture = 6;
    this.game.whiteCapture = 12;
    this.game.size = 9;
    this.game.komi= 5;
    this.game.handicap = 2;
    this.game.rule.ruleName = 'Japanese';
    this.game.timeControl.speed = 'Normal';
    this.game.timeControl.overTime = 'Byo-Yomi';
  }

}
