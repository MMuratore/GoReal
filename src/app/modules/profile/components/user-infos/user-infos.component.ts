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
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'profile-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit, OnDestroy {

  user$ : Observable<User>;
  currentRoute: string;
  routerSubscription: Subscription;
  
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'DEACTIVATE',
    spinnerSize: 19,
    buttonColor: 'warn',
    stroked: true,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    private authService : AuthService,
    private userService : UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user;
    this.currentRoute = this.router.url;
    this.routerSubscription = this.router.events
          .subscribe(
            (event: Event) => {
              if(event instanceof NavigationStart) {
                this.currentRoute = event.url;
              }
            });
    }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  delete() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ConfirmBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        this.btnOpts.active = true;
        this.userService.deactivate(this.authService.userValue.userId)
          .pipe(first())
          .subscribe(() => {
            this.btnOpts.active = false;         

            this.authService.logout();
            this.router.navigate(['/login']);         
          },
          error => {
            this.btnOpts.active = false;         
            this.getServerErrorMessage(error);
        });
      }
    })
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
