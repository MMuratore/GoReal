import { Component, OnInit } from '@angular/core';
import { first, map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StatisticService } from 'src/app/services/statistic.service';
import { Statistic } from 'src/app/models/statistic.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user$ : Observable<User>;
  userStatistic: Statistic = new Statistic();

  cardLayout  = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 2,
          miniCard: { cols: 1, rows: 1 },
          card: { cols: 2, rows: 1 },
          table: { cols: 2, rows: 2 },
        };
      }

      return {
        columns: 7,
        miniCard: { cols: 2, rows: 1 },
        card: { cols: 4, rows: 1 },
        table: { cols: 3, rows: 2 },
      };
    }),shareReplay()
  );

  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private statisticService: StatisticService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user;
    if(this.authService.userValue) {
      this.statisticService.get(this.authService.userValue.userId)
      .pipe(first())
      .subscribe(data => {
        this.userStatistic = data;
      },
      error => {
        this.getServerErrorMessage(error);
      });
    }
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 404) 
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }

}
