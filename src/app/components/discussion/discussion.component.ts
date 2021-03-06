import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() hash;
  @Input() numberOfComments;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToDiscussion(discussionHash) {
    this._router.navigate(['/discussion-content', discussionHash]);
  }

}
