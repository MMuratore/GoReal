import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from 'src/app/models/user.model';


export class TableDataSource extends DataSource<User> {
  data: User[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(data: User[]) {
    super();
    this.data = data;
  }

  connect(): Observable<User[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(a.userId, b.userId, isAsc);
        case 'goTag': return compare(a.goTag, b.goTag, isAsc);
        case 'active': return compare(a.isActive, b.isActive, isAsc); 
        case 'ban': return compare(a.isBan, b.isBan, isAsc); 
        default: return 0;
      }
    });
  }
}

function compare(a: string | number | boolean, b: string | number| boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

