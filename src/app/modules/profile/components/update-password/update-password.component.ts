import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { ConfirmValidator } from 'src/app/helpers/confirm.validators';
import { UserError } from 'src/app/models/userError.enum';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'profile-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
  hidePassword: boolean = true;
  hideOldPassword: boolean = true;
  isConnecting = false;

  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/)]],
      confirm: [''],
    }, { 
      validator: ConfirmValidator('password', 'confirm')
    });
  }
  
  get f() { return this.form.controls; }

  onUpdate() {
    if (this.form.invalid) {
        return;
    }
    console.log(this.data.email)

    this.isConnecting = true;
    this.authService.login(this.data.email, this.f.oldPassword.value)
        .pipe(first())
        .subscribe(
            (user) => {
              this.userService.updatePassword(user.userId, this.f.password.value)
              .pipe(first())
              .subscribe(
                  () => {
                    this.isConnecting = false;    
                    this.getConfirmMessage();
                    this.dialogRef.close();
                  },
                  error => {
                    this.isConnecting = false;
                    this.getServerErrorMessage(error);
              });
            },
            error => {
              this.isConnecting = false;
              this.getServerErrorMessage(error);
            });
  }
  getErrorMessageOldPassword() {
    if (this.f.oldPassword.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.f.oldPassword.hasError('minlength')) {
      return 'Enter at least 8 characters';
    }
    return this.f.oldPassword.hasError('pattern') ? 'at least one A-Z, one a-Z, one 1-9 and one @$!%*?&+' : '';
  }

  getErrorMessagePassword() {
    if (this.f.password.hasError('minlength')) {
      return 'Enter at least 8 characters';
    }
    return this.f.password.hasError('pattern') ? 'at least one A-Z, one a-Z, one 1-9 and one @$!%*?&+'  : '';
  }

  getErrorMessageConfirm() {
    return this.f.confirm.hasError('confirmValidator') ? 'Password do not match' : '';
  }

  private getConfirmMessage() {
    this.snackbar.open('Password successfully updated', 'Dismiss', {
      duration: 3000
    });
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 404) {
      if(httpError.error.type == UserError.NotFound)
        msg = 'invalid password';
    }
    else
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }
}
