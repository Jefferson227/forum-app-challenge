import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { UtilsService } from '../../providers/utils/utils.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {
  discussions = [];

  constructor(
    private _firebaseService: FirebaseService,
    private _utils: UtilsService
  ) {
    const discussionObservable = this._firebaseService.getAllDiscussions();

    discussionObservable.on('value', snap => {
      const firebaseObj = snap.val();

      this.discussions = Object.keys(firebaseObj || []).map(hash => {
        let discussionObj = firebaseObj[hash];

        discussionObj.timestampInt = discussionObj.timestamp;
        discussionObj.timestamp = this._utils.transformDate(discussionObj.timestamp);
        discussionObj.hash = hash;
        discussionObj.comments = discussionObj.comments || [];
        discussionObj.numberOfComments = Object.keys(discussionObj.comments)
                                          .map(commentHash => discussionObj.comments[commentHash])
                                          .length;

        return discussionObj;
      });

      this.discussions.sort((a, b) => {
        if (a.timestampInt < b.timestampInt) {
          return 1;
        } else if (a.timestampInt > b.timestampInt) {
          return -1;
        } else {
          return 0;
        }
      });
    });
  }

  ngOnInit() {
  }

}
