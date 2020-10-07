import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rule } from '../models/Rule.model';


@Injectable({
  providedIn: 'root'
})
export class RuleService {
  
  constructor(
    private http: HttpClient
  ){ }

  get() {
    return this.http.get<Rule[]>(`${environment.apiUrl}/rule`);
  }
}


