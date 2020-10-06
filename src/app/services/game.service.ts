import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Stone } from '../models/Stone.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(
    private http: HttpClient
  ){ }

  getByUserId(userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.get<Game[]>(`${environment.apiUrl}/game`, {params});
  }

  get(id: number) {
    return this.http.get<Game>(`${environment.apiUrl}/game/${id}`);
  }

  create(game: Game) {
    return this.http.post(`${environment.apiUrl}/game`, game);
  }

  makeMove(id : number, newStone: Stone) {
    return this.http.patch(`${environment.apiUrl}/game/${id}`, newStone)
      .pipe(map(data => {
        return data;
      }));
  }

  pass(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.patch(`${environment.apiUrl}/game/pass/${id}`, {}, {params})
      .pipe(map(data => {
        return data;
      }));
  }

  resign(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.patch(`${environment.apiUrl}/game/resign/${id}`, {}, {params})
      .pipe(map(data => {
        return data;
      }));
  }
}


