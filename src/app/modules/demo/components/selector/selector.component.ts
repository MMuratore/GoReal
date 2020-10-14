import { Component, OnInit } from '@angular/core';
import { first  } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RuleService } from 'src/app/services/rule.service';
import { TimeControlService } from 'src/app/services/timeControl.service';
import { Rule } from 'src/app/models/Rule.model';
import { TimeControl } from 'src/app/models/TimeControl.model';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'demo-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  form: FormGroup;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'CREATE DEMO',
    spinnerSize: 19,
    buttonColor: 'primary',
    stroked: true,    
    fullWidth: false,
    disabled: true,
    mode: 'indeterminate'
  };

  rules: Rule[] = [];
  timeControl: TimeControl[] = [];
  speed: string[] = [];
  overTime: string[] = [];
  boardSize = [9, 13, 19];

  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private ruleService: RuleService,
    private timeControlService: TimeControlService,
    private authService: AuthService,
    private gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ruleService.get().pipe(first())
      .subscribe(data => {
        this.rules = data;
      },
      error => {
        this.getServerErrorMessage(error);
      });
    this.timeControlService.get().pipe(first())
    .subscribe(data => {
      this.timeControl = data;
      data.forEach(item => {
        this.speed.push(item.speed);
        this.overTime.push(item.overTime)
      })
      this.speed = Array.from( new Set(this.speed));
      this.overTime = Array.from( new Set(this.overTime));
    },
    error => {
      this.getServerErrorMessage(error);
    });
    this.form = this.formBuilder.group({
      size: ['', [Validators.required]],
      rule: ['', [Validators.required]],
      handicap: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      komi: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      speed: ['', [Validators.required]],
      overTime: ['', [Validators.required]]
    });
    }

  get f() { return this.form.controls; }

  onSubmit() {
    this.btnOpts.active = true;
    let newGame: Game = new Game();
    newGame.size = this.f.size.value;
    newGame.komi = parseInt(this.f.komi.value);
    newGame.handicap = parseInt(this.f.handicap.value);
    newGame.timeControl.id = this.timeControl.find( item => item.overTime == this.f.overTime.value && item.speed == this.f.speed.value).id;
    newGame.rule.id = this.rules.find( item => item.ruleName == this.f.rule.value).id;
    newGame.blackPlayer.userId = this.authService.userValue.userId;
    newGame.whitePlayer.userId = this.authService.userValue.userId;

    this.gameService.create(newGame)
    .pipe(first())
    .subscribe(
      (data) => {
        this.btnOpts.active = false;
        this.router.navigate([`demo/goban/${data.id}`]);
      },
      error => {
        this.btnOpts.active = false;
        this.getServerErrorMessage(error);
      });
  }

  onBlitz() {
    this.f.size.setValue(9);
    this.f.rule.setValue('Japanese');
    this.f.handicap.setValue(0);
    this.f.komi.setValue(5);
    this.f.speed.setValue('Blitz');
    this.f.overTime.setValue('Byo-Yomi');
  }

  onLive() {
    this.f.size.setValue(9);
    this.f.rule.setValue('Japanese');
    this.f.handicap.setValue(0);
    this.f.komi.setValue(5);
    this.f.speed.setValue('Live');
    this.f.overTime.setValue('Byo-Yomi');
  }

  onFavorite() {

  }

  getErrorMessageHandicap() {
    if (this.f.handicap.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.f.handicap.hasError('min')) {
      return 'Handicap of minimum 0';
    }
    return this.f.handicap.hasError('max') ? 'Handicap of maximum 9' : '';
  }

  getErrorMessageKomi() {
    if (this.f.komi.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.f.komi.hasError('min')) {
      return 'Komi of minimum 0';
    }
    return this.f.komi.hasError('max') ? 'Komi of maximum 10' : '';
  }

  getErrorMessageRequired(field: FormControl) {
    return field.hasError('required') ? 'You must select a value' : '';
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
