import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimeControl } from '../models/TimeControl.model';


@Injectable({
  providedIn: 'root'
})
export class TimeControlService {
  
  constructor(
    private http: HttpClient
  ){ }

  get() {
    return this.http.get<TimeControl[]>(`${environment.apiUrl}/timecontrol`);
  }
}


