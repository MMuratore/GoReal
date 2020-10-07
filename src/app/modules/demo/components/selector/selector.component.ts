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

@Component({
  selector: 'demo-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  form: FormGroup;

  isConnecting: boolean = false;
  rules: Rule[] = [];
  speed: string[] = [];
  overTime: string[] = [];
  boardSize = [9, 12, 19];

  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private ruleService: RuleService,
    private timeControlService: TimeControlService,
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
      speed: ['', [Validators.required]],
      overTime: ['', [Validators.required]]
    });
    }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log("pass")
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
