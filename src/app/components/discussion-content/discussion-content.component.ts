import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { UtilsService } from '../../providers/utils/utils.service';
import { Router } from '@angular/router';

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
  comment;
  timestamp;
  comments = [];
  canDeleteDiscussion = false;

  constructor(
    private _route: ActivatedRoute,
    private _firebase: FirebaseService,
    private _utils: UtilsService,
    private _router: Router,
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
      const discussionObj = snap.val();
      if (!discussionObj) { return; }

      this.user = discussionObj.user;
      this.title = discussionObj.title;
      this.message = discussionObj.message;
      this.comments = Object.keys(discussionObj.comments || []);
      this.timestamp = this._utils.transformDate(discussionObj.timestamp, 'seconds', 60);
      this.canDeleteDiscussion = this.checkIfCanDeleteDiscussion(this.user);

      this.transformCommentsObjectIntoArray(discussionObj);
    });
  }

  addComment() {
    const commentObj = {
      comment: this.comment,
      user: this.getCurrentUsernameLogged(),
      timestamp: new Date().getTime()
    };

    this._firebase.addCommentToADiscussion(this.discussionHash, commentObj);
    this.comment = '';
  }

  deleteComment() {
    this._firebase.deleteCommentToADiscussion(this.discussionHash);
    this._router.navigate(['/']);
  }

  transformCommentsObjectIntoArray(discussionObj) {
    this.comments = this.comments.map(item => {
      let _item = discussionObj.comments[item];

      _item.timestampInt = _item.timestamp;
      _item.timestamp = this._utils.transformDate(_item.timestamp, 'seconds', 60);
      return _item;
    });

    this.comments.sort((a, b) => {
      if (a.timestampInt < b.timestampInt) {
        return 1;
      } else if (a.timestampInt > b.timestampInt) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
