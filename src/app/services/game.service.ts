import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Stone } from '../models/Stone.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameSubject: BehaviorSubject<Game>;
  public game: Observable<Game>;

  constructor(
    private http: HttpClient
  ){ 
    this.gameSubject = new BehaviorSubject<Game>(JSON.parse(localStorage.getItem('game')));
    this.game = this.gameSubject.asObservable();
  }

  getByUserId(userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.get<Game[]>(`${environment.apiUrl}/game`, {params});
  }

  get(id: number) {
    return this.http.get<Game>(`${environment.apiUrl}/game/${id}`)
      .pipe(map(game => {
        localStorage.setItem('game', JSON.stringify(game));
        this.gameSubject.next(game);
        return game;
      }));
  }

  create(game: Game) {
    return this.http.post<Game>(`${environment.apiUrl}/game`, game)
  }

  makeMove(id : number, newStone: Stone) {
    return this.http.patch<Game>(`${environment.apiUrl}/game/${id}`, newStone)
  }

  pass(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.patch<Game>(`${environment.apiUrl}/game/pass/${id}`, {}, {params})
  }

  resign(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.patch<Game>(`${environment.apiUrl}/game/resign/${id}`, {}, {params})
  }
}


