import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserError } from '../../../../models/userError.enum';
import { AuthService } from '../../../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  hidePassword: boolean = true;
  isConnecting: boolean = false;
  
  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
                      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
        return;
    }
    this.isConnecting = true;

    this.authService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            () => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
              this.isConnecting = false;
              this.getServerErrorMessage(error);
            });
  }
  
  getErrorMessageEmail() {
    if (this.f.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.f.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.f.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.f.password.hasError('minlength')) {
      return 'Enter at least 8 characters';
    }
    else if (this.f.password.hasError('maxlength')) {
      return 'Enter no more than 20 characters';
    }
    return this.f.password.hasError('pattern') ? 'must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&+)' : '';
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 400) {
      if(httpError.error.type == UserError.Inactive)
        msg = 'your account is inactive';
      if(httpError.error.type == UserError.Ban)
        msg = 'your account is ban';
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
