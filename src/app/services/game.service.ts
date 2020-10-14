import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Stone } from '../models/Stone.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoveResult } from '../models/moveResult.model';


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
      .pipe(map(newGame => {
        localStorage.setItem('game', JSON.stringify(newGame));
        this.gameSubject.next(newGame);
        return newGame;
      }));
  }

  makeMove(id : number, newStone: Stone) {
    return this.http.put<MoveResult>(`${environment.apiUrl}/game/${id}`, newStone)
      .pipe(map(data => {
        let newGame = this.gameSubject.value;
        data.stones.forEach( item => newGame.board.stoneMap[item.row][item.column] = item.color);
        newGame.blackCapture = data.blackCapture;
        newGame.whiteCapture = data.whiteCapture;
        newGame.koInfo = data.koInfo;
        newGame.blackState = data.blackState;
        newGame.whiteState = data.whiteState;
        newGame.result = data.result;
        localStorage.setItem('game', JSON.stringify(newGame));
        this.gameSubject.next(newGame);
        return data;
      }));
  }

  pass(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.put<MoveResult>(`${environment.apiUrl}/game/${id}/pass`, {}, {params})
      .pipe(map(data => {
        console.log(data)
        let newGame = this.gameSubject.value;
        data.stones.forEach( item => newGame.board.stoneMap[item.row][item.column] = item.color);
        newGame.blackCapture = data.blackCapture;
        newGame.whiteCapture = data.whiteCapture;
        newGame.koInfo = data.koInfo;
        newGame.blackState = data.blackState;
        newGame.whiteState = data.whiteState;
        newGame.result = data.result;
        localStorage.setItem('game', JSON.stringify(newGame));
        this.gameSubject.next(newGame);
        return newGame;
      }));
  }

  resign(id : number, userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.put<MoveResult>(`${environment.apiUrl}/game/${id}/resign`, {}, {params})
      .pipe(map(data => {
        let newGame = this.gameSubject.value;
        data.stones.forEach( item => newGame.board.stoneMap[item.column][item.row] = item.color);
        newGame.blackCapture = data.blackCapture;
        newGame.whiteCapture = data.whiteCapture;
        newGame.koInfo = data.koInfo;
        newGame.blackState = data.blackState;
        newGame.whiteState = data.whiteState;
        newGame.result = data.result;
        localStorage.setItem('game', JSON.stringify(newGame));
        this.gameSubject.next(newGame);
        return newGame;
      }));
  }
}


