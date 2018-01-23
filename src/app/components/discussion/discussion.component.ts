import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  @Input() message;
  @Input() date;
  @Input() title;
  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
