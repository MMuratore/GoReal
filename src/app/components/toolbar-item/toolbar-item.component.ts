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
  @Input() user: User;
  @Input() roles: Role = Role.None;

  Role = Role;

  constructor() { }

  ngOnInit(): void {
  }

  public hasRoles(roles: Role): boolean {
    if(!(roles == Role.None)) {
      if(roles === (this.user.roles & roles))
        return true;
      else
        return false;
    }
    return true;
  }

}
