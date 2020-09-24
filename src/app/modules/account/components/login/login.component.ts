import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserError } from '../../models/userError.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  hidePassword: boolean = true;
  httpError = null;
  isConnecting: boolean = false;
  
  constructor(
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
              this.isConnecting = false;
              this.httpError = error;
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

  getErrorMessage() {
    console.log()
    if(this.httpError.status == 400) {
      if(this.httpError.error.detail == UserError.Inactive)
        return 'your account is inactive';
      
      if(this.httpError.error.detail == UserError.Ban)
        return 'your account is ban';
    }
    if(this.httpError.status == 404) {
      return 'invalid login or password';
    }

    this.httpError = null;
    return 'Unable to connect to server';
  }
}
