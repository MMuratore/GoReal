import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Rule } from 'src/app/models/Rule.model';
import { TimeControl } from 'src/app/models/TimeControl.model';
import { User } from 'src/app/models/user.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  templateUrl: './game-infos.component.html',
  styleUrls: ['./game-infos.component.scss']
})
export class GameInfosComponent implements OnInit {

  game$: Observable<Game>;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.game;
  }

}
