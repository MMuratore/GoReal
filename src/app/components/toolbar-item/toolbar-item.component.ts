import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../models/role.enum';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss']
})
export class ToolbarItemComponent implements OnInit {
  @Input() icon: string;
  @Input() link: string;
  @Input() click: Function;

  constructor() { }

  ngOnInit(): void {
  }
}
