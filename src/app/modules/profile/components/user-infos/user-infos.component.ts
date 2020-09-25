import { Component, OnInit } from '@angular/core';
import { User } from '../../../account/models/user.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../../modules/account/services/auth.service';

@Component({
  selector: 'profile-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  public user : User;
  httpError: number = null;
  isConnecting: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    private authService : AuthService,
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
  }

  delete(id :number) : void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ConfirmBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        this.isConnecting = true;
        this.userService.delete(id)
          .pipe(first())
          .subscribe(() => {
            this.authService.logout();
            this.router.navigate(['/login']);         
          },
          httpError => {
            this.getErrorMessage(httpError.status);
            this.isConnecting = false;
          });
      }
    })
  }

  public getErrorMessage(error: number) {
    let msg : string;
    if(error == 404)
      msg = '...'
    else
      msg = 'Unable to connect to server'
    this.httpError = null;
    let snackBarRef = this.snackbar.open(msg, 'Dismiss', {
      duration: 3000
    });
    
  }
}
