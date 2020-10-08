import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NavigationStart, Router, Event } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Game } from 'src/app/models/game.model';
import { GameError } from 'src/app/models/gameError.enum';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'home-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Game>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Date', 'Opponent', 'Type', 'Link'];
  
  currentRoute: string;
  routerSubscription: Subscription;
  user$ : Observable<User>;
  noGamePlayed: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.noGamePlayed = false;
    this.user$ = this.authService.user;
    this.currentRoute = this.router.url;
    this.routerSubscription = this.router.events
          .subscribe(
            (event: Event) => {
              if(event instanceof NavigationStart) {
                this.currentRoute = event.url;
              }
            });
    }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.gameService.getByUserId(this.authService.userValue.userId)
      .pipe(first())
      .subscribe((data) => {
        let currentGame = data.filter(x => x.result == null);
        this.dataSource = new TableDataSource(currentGame);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error => {
        this.getServerErrorMessage(error);
      });
  }

  rowIsShow(id: Number): boolean {
    if(`/profile/gameInfos/${id}` == this.currentRoute)
      return true;
    return false;
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 404) {
      if(httpError.error.type == GameError.NoGamePlayed)
        this.noGamePlayed = true;
    }
    else
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }    
}
