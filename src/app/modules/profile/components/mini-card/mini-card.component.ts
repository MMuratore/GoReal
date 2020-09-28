import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'play-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent implements OnInit {
  @Input() icon: string;
  @Input() value: number;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
