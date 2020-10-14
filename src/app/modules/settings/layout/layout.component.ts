import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  form: FormGroup;
  settings$: Observable<Settings>;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settings$ = this.settingsService.settings;

    this.form = this.formBuilder.group({
      music: this.settingsService.settingsSubject.value.music,
      effect: this.settingsService.settingsSubject.value.effect
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.settingsService.update(this.form.value);
  }

}

