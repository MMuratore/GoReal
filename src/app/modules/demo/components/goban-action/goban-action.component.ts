import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { GameError } from 'src/app/models/gameError.enum';


@Component({
  selector: 'demo-goban-action',
  templateUrl: './goban-action.component.html',
  styleUrls: ['./goban-action.component.scss']
})
export class GobanActionComponent implements OnInit {
  game$: Observable<Game>;
  
  passOpts: MatProgressButtonOptions = {
    active: false,
    text: 'PASS',
    spinnerSize: 19,
    stroked: true,
    fullWidth: true,
    disabled: true,
    mode: 'indeterminate'
  };

  resignOpts: MatProgressButtonOptions = {
    active: false,
    text: 'RESIGN',
    spinnerSize: 19,
    stroked: true,
    fullWidth: true,
    disabled: true,
    mode: 'indeterminate'
  };

  whitePassOpts: MatProgressButtonOptions = {
    active: false,
    text: 'PASS',
    spinnerSize: 19,
    stroked: true,
    fullWidth: true,
    disabled: true,
    mode: 'indeterminate'
  };

  whiteResignOpts: MatProgressButtonOptions = {
    active: false,
    text: 'RESIGN',
    spinnerSize: 19,
    stroked: true,
    fullWidth: true,
    disabled: true,
    mode: 'indeterminate'
  };

  constructor(
    private snackbar: MatSnackBar,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.game;
  }

  onResign() {
    if(this.gameService.gameSubject.value.blackState)
      this.resignOpts.active = true;
    else
      this.whiteResignOpts.active = true;

    this.gameService.resign(this.gameService.gameSubject.value.id,this.authService.userValue.userId)
    .pipe(first())
    .subscribe(
      () => {
        this.resignOpts.active = false;
        this.whiteResignOpts.active = false;
      },
      error => {
        this.getServerErrorMessage(error);
        this.resignOpts.active = false;
        this.whiteResignOpts.active = false;

      });
  }

  onPass() {
    if(this.gameService.gameSubject.value.blackState)
      this.passOpts.active = true;
    else
      this.whitePassOpts.active = true;
    
    this.gameService.pass(this.gameService.gameSubject.value.id,this.authService.userValue.userId)
    .pipe(first())
    .subscribe(
      () => {
        this.passOpts.active = false;
        this.whitePassOpts.active = false;
      },
      error => {
        this.getServerErrorMessage(error);
        this.passOpts.active = false;
        this.whitePassOpts.active = false;

      });
  }

  activePlayer(playerState: boolean) {
    if(playerState === true)
      return {
        'background-color': `rgba(0,0,0,0.5)`
      }
  }

  passPlayer(playerState: boolean) {
    if(playerState === null)
      return {
        'background-color': `rgba(210,28,28,.5)`
      }
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 400) {
      if(httpError.error.type == GameError.OtherPlayerTurn)
        msg = 'Board is not valid';
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
