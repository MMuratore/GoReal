import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { UserService } from '../../../../services/user.service';
import { first  } from 'rxjs/operators';
import { Router, NavigationStart, Event } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'demo-goban',
  templateUrl: './goban.component.html',
  styleUrls: ['./goban.component.scss']
})
export class GobanComponent implements OnInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit(): void {
    }

  ngOnDestroy() {
  }

}
