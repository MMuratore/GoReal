import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){ }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/admin/user`, this.httpOptions(this.authService.userValue.token));
  }

  update(id : number, user: User) {
    return this.http.put<User>(`${environment.apiUrl}/user/${id}`, user, this.httpOptions(this.authService.userValue.token))
      .pipe(map(data => {
        if (id == this.authService.userValue.userId) {
            localStorage.setItem('user', JSON.stringify(data));
            this.authService.userSubject.next(user);
        }
        return data;
      }));
    }

  deactivate(id : number ) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`, this.httpOptions(this.authService.userValue.token))
      .pipe(map(data => {
        if (id == this.authService.userValue.userId) {
          this.authService.logout();
        }
        return data;
      }));
  }
  

  activate(id : number) {
    return this.http.patch(`${environment.apiUrl}/admin/user/activate/${id}`, {}, this.httpOptions(this.authService.userValue.token))
      .pipe(map(data => {
        return data;
      }));
  }

  ban(id : number) {
    return this.http.patch(`${environment.apiUrl}/admin/user/ban/${id}`, {}, this.httpOptions(this.authService.userValue.token))
      .pipe(map(data => {
        if (id == this.authService.userValue.userId) {
            this.authService.logout();
        }
        return data;
      }));
  }

  delete(id : number ) {
    return this.http.delete(`${environment.apiUrl}/admin/user/${id}`, this.httpOptions(this.authService.userValue.token))
      .pipe(map(data => {
        if (id == this.authService.userValue.userId) {
          this.authService.logout();
        }
        return data;
      }));
  }

  private httpOptions(token: string) {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    return options;
  }
}


