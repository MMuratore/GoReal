import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { ConfirmBoxComponent } from 'src/app/components/confirm-box/confirm-box.component';
import { User } from 'src/app/models/user.model';
import { UserError } from 'src/app/models/userError.enum';
import { UserService } from 'src/app/services/user.service';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'administrator-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  
  dataSource: TableDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'goTag', 'email', 'active', 'ban', 'delete'];


  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    private userService: UserService,
  ) {  }

  ngAfterViewInit() {
    this.userService.getAll()
          .pipe(first())
          .subscribe((data) => {
            this.dataSource = new TableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.table.dataSource = this.dataSource;
          },
          error => {
            this.getServerErrorMessage(error);
          });
  }

  delete(id :number) : void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ConfirmBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        let index = this.dataSource.data.findIndex(x => x.userId == id);
        this.dataSource.data[index].isRequesting = true;
        this.userService.delete(id)
          .pipe(first())
          .subscribe(() => {
            this.dataSource.data[index].isRequesting = false;
            this.dataSource.data.splice(index, 1);
            this.dataSource = new TableDataSource(this.dataSource.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.table.dataSource = this.dataSource;
          },
          error => {      
            this.dataSource.data[index].isRequesting = false;    
            this.getServerErrorMessage(error);
          });
      } 
    })
  }

  activate(id :number) : void {
    let index = this.dataSource.data.findIndex(x => x.userId == id);
    this.dataSource.data[index].isRequesting = true;
    this.userService.activate(id)
      .pipe(first())
      .subscribe( () => {
          this.dataSource.data[index].isRequesting = false;
          this.dataSource.data[index].isActive = !this.dataSource.data[index].isActive;
        },
        error => {
          this.dataSource.data[index].isRequesting = false;
          this.getServerErrorMessage(error);
        })
  }

  ban(id :number) : void {
    let index = this.dataSource.data.findIndex(x => x.userId == id);
    this.dataSource.data[index].isRequesting = true;
    this.userService.ban(id)
      .pipe(first())
      .subscribe( () => {
          this.dataSource.data[index].isRequesting = false;
          this.dataSource.data[index].isBan = !this.dataSource.data[index].isBan;
        },
        error => {
          this.dataSource.data[index].isRequesting = false;
          this.getServerErrorMessage(error);
        })
  }

  private getServerErrorMessage(httpError: HttpErrorResponse) {
    let msg : string;
    if(httpError.status == 404) {
      if(httpError.error.type == UserError.NotFound)
        msg = 'invalid login or password';
    }
    else
      msg = 'Unable to connect to server';
    if(msg)
      this.snackbar.open(msg, 'Dismiss', {
        duration: 3000
      });
  }    
}
