import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'play-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  cardLayout  = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 3,
          miniCard: { cols: 1, rows: 1 },
          card: { cols: 3, rows: 2 },
          table: { cols: 3, rows: 2 },
          maxCard: { cols: 3, rows: 3 },

        };
      }

      return {
        columns: 5,
        miniCard: { cols: 1, rows: 1 },
        card: { cols: 2, rows: 1 },
        table: { cols: 2, rows: 2 },
        maxCard: { cols: 3, rows: 2 },

      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
