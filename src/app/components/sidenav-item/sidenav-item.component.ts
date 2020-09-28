import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {
  @Input() icon: string;
  @Input() title: string;
  @Input() link: string;
  @Input() click: Function;

  constructor() { }

  ngOnInit(): void {
  }
  

}
