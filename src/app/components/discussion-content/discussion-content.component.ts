import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion-content',
  templateUrl: './discussion-content.component.html',
  styleUrls: ['./discussion-content.component.scss']
})
export class DiscussionContentComponent implements OnInit {

  discussionHash;

  constructor(private _route: ActivatedRoute) {
    this.discussionHash = this._route.snapshot.params['hash'];
  }

  ngOnInit() {
  }

}
