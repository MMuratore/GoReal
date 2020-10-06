import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserError } from '../../../../models/userError.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from '../update-password/update-password.component';


@Component({
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  pwdForm: FormGroup;
  userForm: FormGroup;
  isConnecting: boolean = false;
  currentUser: User;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userValue;
    this.authService.userSubject;
    this.userForm = this.formBuilder.group({
      userId: [''],
      goTag: [this.currentUser.goTag, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      lastName: [this.currentUser.lastName, [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z -]*$/)]],
      firstName: [this.currentUser.firstName, [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z -]*$/)]],
      email: [this.currentUser.email]
    });
  }

  get f() { return this.userForm.controls; }

  onUpdate() {
    if (this.userForm.invalid) {
        return;
    }
    
    this.currentUser.goTag = this.f.goTag.value;
    this.currentUser.lastName = this.f.lastName.value;
    this.currentUser.firstName = this.f.firstName.value;
    this.currentUser.email = this.f.email.value;
    this.isConnecting = true;
    this.userService.update(this.currentUser.userId, this.currentUser)
        .pipe(first())
        .subscribe(
            () => {
              this.isConnecting = false;
              if(!(this.f.password.value === "")) {
                this.authService.logout();
              }
            },
            error => {
              this.isConnecting = false;
              this.getServerErrorMessage(error)
        });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdatePasswordComponent,
      {data: { email: this.currentUser.email }
    });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
    });
  }

  getErrorMessageGoTag() {
    if (this.f.goTag.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.f.goTag.hasError('goTagUse')) {
      return 'GoTag already use';
    }
    return this.f.goTag.hasError('pattern') ? 'must only contain alphanumeric characters' : '';
  }

  getErrorMessageLastName() {
    return this.f.lastName.hasError('pattern') ? 'must only contain text characters, white space and hyphen' : '';
  }

  getErrorMessageFirstName() {
    return this.f.firstName.hasError('pattern') ? 'must only contain text characters, white space and hyphen' : '';
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 400) {
      if(httpError.error.type == UserError.GoTagNotUnique)
        this.f.goTag.setErrors({goTagUse:true});
    }
    else if(httpError.status == 404) {
      if(httpError.error.type == UserError.NotFound)
        msg = 'invalid login or password';
    }
    else
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }
}
