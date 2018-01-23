import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../providers/firebase/firebase.service';

@Component({
  selector: 'app-discussion-content',
  templateUrl: './discussion-content.component.html',
  styleUrls: ['./discussion-content.component.scss']
})
export class DiscussionContentComponent implements OnInit {

  discussionHash;

  constructor(
    private _route: ActivatedRoute,
    private _firebase: FirebaseService,
  ) {
    this.discussionHash = this._route.snapshot.params['hash'];
    this._firebase.getDataFromDiscussion(this.discussionHash);
  }

  ngOnInit() {
  }

}
