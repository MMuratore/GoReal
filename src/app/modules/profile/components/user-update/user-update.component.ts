import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfirmValidator } from '../../../../helpers/confirm.validators';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserError } from '../../../../models/userError.enum';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup;
  hidePassword: boolean = true;
  hideOldPassword: boolean = true;
  isConnecting: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = this.authService.userValue;
    this.form = this.formBuilder.group({
      userId: [''],
      goTag: [user.goTag, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      lastName: [user.lastName, [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z -]*$/)]],
      firstName: [user.firstName, [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z -]*$/)]],
      email: [user.email],
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/)]],
      password: ['', [ Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/)]],
      confirm: [''],
    }, { 
      validator: ConfirmValidator('password', 'confirm')
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    this.isConnecting = true;
    this.authService.login(this.f.email.value, this.f.oldPassword.value)
    .pipe(first())
    .subscribe(
        data => {
          let user = new User();
          user.userId = data.userId;
          user.goTag = this.f.goTag.value;
          user.lastName = this.f.lastName.value;
          user.firstName = this.f.firstName.value;
          user.email = this.f.email.value;
          if(!(this.f.password.value === ""))
            user.password = this.f.password.value;
          else
            user.password = this.f.oldPassword.value;

          this.userService.update(this.route.snapshot.params['id'], user)
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
        },
        error => {
          this.isConnecting = false;
          this.getServerErrorMessage(error);
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

  getErrorMessageOldPassword() {
    if (this.f.oldPassword.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.f.oldPassword.hasError('minlength')) {
      return 'Enter at least 8 characters';
    }
    return this.f.oldPassword.hasError('pattern') ? 'must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&+)' : '';
  }

  getErrorMessagePassword() {
    if (this.f.password.hasError('minlength')) {
      return 'Enter at least 8 characters';
    }
    return this.f.password.hasError('pattern') ? 'must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&+)' : '';
  }

  getErrorMessageConfirm() {
    return this.f.confirm.hasError('confirmValidator') ? 'Password do not match' : '';
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
