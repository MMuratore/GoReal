import {Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import { first } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../../components/confirm-box/confirm-box.component';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'administrator-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  public users: User[] = null;
  displayedColumns: string[] = ['userId', 'GoTag', 'FullName', 'Email', 'isActive', 'isBan', 'AdminDelete'];

  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    private userService: UserService
  ) {  }

  ngOnInit(): void {
    this.userService.getAll()
            .pipe(first())
            .subscribe((users) => {
              this.users = users;
            },
            error => {
              this.getServerErrorMessage(error.status);
            });
  }

  delete(id :number) : void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ConfirmBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        let index = this.users.findIndex(x => x.userId == id);
        this.users[index].isRequesting = true;
        this.userService.delete(id)
          .pipe(first())
          .subscribe(() => {
            this.users[index].isRequesting = false;
            this.users = this.users.filter(x => x.userId !== id) 
          },
          error => {      
            this.users[index].isRequesting = false;    
            this.getServerErrorMessage(error.status);
          });
      } 
    })
  }

  patch(id :number, action: string) : void {
    let index = this.users.findIndex(x => x.userId == id);
    this.users[index].isRequesting = true;
    this.userService.patch(id, action)
      .pipe(first())
      .subscribe( () => {
          this.users[index].isRequesting = false;
          if(action == "activate")
            this.users[index].isActive = !this.users[index].isActive;
          else
            this.users[index].isBan = !this.users[index].isBan;

        },
        error => {
          this.users[index].isRequesting = false;
          this.getServerErrorMessage(error.status);
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