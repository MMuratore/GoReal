import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Statistic } from '../models/statistic.model';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  
  constructor(
    private http: HttpClient
  ){ }

  get(userId: number) {
    const params = new HttpParams().set('userId', `${userId}`);
    return this.http.get<Statistic>(`${environment.apiUrl}/statistic`, {params});
  }
}


