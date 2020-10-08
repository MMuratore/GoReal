import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'demo-goban-action',
  templateUrl: './goban-action.component.html',
  styleUrls: ['./goban-action.component.scss']
})
export class GobanActionComponent implements OnInit {
  game$: Observable<Game>;
  isConnecting: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.game;
  }

  onResign() {
    this.isConnecting = true;
    this.gameService.resign(this.gameService.gameSubject.value.id,this.authService.userValue.userId)
    .pipe(first())
    .subscribe(
      () => {},
      error => {
        this.getServerErrorMessage(error);
        this.isConnecting = false;
      });
  }

  onPass() {
    this.isConnecting = true;
    this.gameService.pass(this.gameService.gameSubject.value.id,this.authService.userValue.userId)
    .pipe(first())
    .subscribe(
      () => {},
      error => {
        this.getServerErrorMessage(error);
        this.isConnecting = false;
      });
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 404) 
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }
}
