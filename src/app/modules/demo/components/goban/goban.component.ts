import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Game } from 'src/app/models/game.model';
import { GameError } from 'src/app/models/gameError.enum';
import { Settings } from 'src/app/models/settings.model';
import { Stone } from 'src/app/models/Stone.model';
import { GameService } from 'src/app/services/game.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'demo-goban',
  templateUrl: './goban.component.html',
  styleUrls: ['./goban.component.scss']
})
export class GobanComponent implements OnInit {

  game$: Observable<Game>;

  private get gridWidth(): number { return (60-(60/this.gameService.gameSubject.value.size))/60*100;}
  private get gridMargin(): number { return this.gridWidth/(this.gameService.gameSubject.value.size - 1)/2;}
  private get stoneWidth(): number { return 100/this.gameService.gameSubject.value.size;}

  constructor(
    private snackbar: MatSnackBar,
    private gameService: GameService,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.game;
    }

  gridSize() {
    return {
      'margin-top': `${this.gridMargin}%`,
      'left': `${this.gridMargin}%`,
      'width': `${this.gridWidth}%`
    }
  }

  stonePosition(row: number, column: number) {
    return {
      'width': `${this.stoneWidth}%`,
      'top': `${this.stoneWidth*row}%`,
      'left': `${this.stoneWidth*column}%`
    }
  }

  makeMove(row: number, column: number) {
    let stoneColor: boolean;
    if(this.gameService.gameSubject.value.blackState === true)
      stoneColor = false;
    else if(this.gameService.gameSubject.value.whiteState === true)
      stoneColor = true;
      this.gameService.makeMove(Number(this.route.snapshot.paramMap.get('id')), 
                              new Stone(row, column, stoneColor)).pipe(first())
      .subscribe(
        (data) => {
          if(this.settingsService.settingsSubject.value.effect) {
            this.playStoneAudio();
            if(data.stones.some(item => item.color === null))
              this.playCaptureAudio();
          }
        },
        error => {
          this.getServerErrorMessage(error);
        });
  }

  private playStoneAudio(){
    let audio = new Audio();
    audio.src = "../../../../../../assets/sound/effect/0.mp3";
    audio.load();
    audio.play();
  }

  private playCaptureAudio(){
    let audio = new Audio();
    audio.src = "../../../../../../assets/sound/effect/capture0.mp3";
    audio.load();
    audio.play();
  }

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 400) {
      if(httpError.error.type == GameError.BoardNotValid)
        msg = 'Board is not valid';
      if(httpError.error.type == GameError.InvalidMove)
        msg = 'Invalid move';
      if(httpError.error.type == GameError.PreventOverwrite)
        msg = 'Overwrite not allowed';
      if(httpError.error.type == GameError.PreventKo)
        msg = 'Ko on this position';
      if(httpError.error.type == GameError.PreventSuicide)
        msg = 'Suicide not allowed';
      if(httpError.error.type == GameError.GameFinished)
        msg = 'Game Finished';
    }
    else if(httpError.status == 404) {
      if(httpError.error.type == GameError.GameNotExist)
        msg = 'Game Not Found';

    }
    else
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }
}
