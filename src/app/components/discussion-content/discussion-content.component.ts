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
  user;
  title;
  message;
  canDeleteDiscussion = false;

  constructor(
    private _route: ActivatedRoute,
    private _firebase: FirebaseService,
  ) {
    this.discussionHash = this._route.snapshot.params['hash'];
    this.getDataFromDiscussion();
  }

  ngOnInit() {
  }

  getCurrentUsernameLogged() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.displayName || user.email;
  }

  checkIfCanDeleteDiscussion(userWhoCreatedDiscussion) {
    return userWhoCreatedDiscussion === this.getCurrentUsernameLogged();
  }

  getDataFromDiscussion() {
    const discussionObservable = this._firebase.getDataFromDiscussion(this.discussionHash);

    discussionObservable.on('value', snap => {
      console.log(snap.val());
      const discussionObj = snap.val();

      this.user = discussionObj.user;
      this.title = discussionObj.title;
      this.message = discussionObj.message;
      this.canDeleteDiscussion = this.checkIfCanDeleteDiscussion(this.user);
    });
  }
}
