import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Settings } from '../models/settings.model';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settingsSubject: BehaviorSubject<Settings>;
  public settings: Observable<Settings>;

  constructor(){ 
    this.settingsSubject = new BehaviorSubject<Settings>(JSON.parse(localStorage.getItem('settings')));
    this.settings = this.settingsSubject.asObservable();
  }

  update(settings: Settings) {
      localStorage.setItem('settings', JSON.stringify(settings));
      this.settingsSubject.next(settings);
  }
}


