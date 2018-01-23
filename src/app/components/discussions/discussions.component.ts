import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {
  discussions = [];

  constructor(private _firebaseService: FirebaseService) {
    const discussionObservable = this._firebaseService.getAllDiscussions();

    discussionObservable.on('value', snap => {
      const firebaseObj = snap.val();

      this.discussions = Object.keys(firebaseObj).map(hash => {
        let discussionObj = firebaseObj[hash];

        discussionObj.timestamp = this.transformDate(discussionObj.timestamp);
        discussionObj.hash = hash;
        discussionObj.comments = discussionObj.comments || [];
        discussionObj.numberOfComments = Object.keys(discussionObj.comments)
                                          .map(commentHash => discussionObj.comments[commentHash])
                                          .length;

        return discussionObj;
      });
      console.log(this.discussions);
    });
  }

  ngOnInit() {
  }

  transformDate(timestamp) {
    let diff = moment(new Date()).diff(timestamp, 'seconds');
    let value = '';

    if (diff > 60) {
      diff = moment(new Date()).diff(timestamp, 'minutes');

      if (diff > 60) {
        diff = moment(new Date()).diff(timestamp, 'hours');

        if (diff > 24) {
          diff = moment(new Date()).diff(timestamp, 'days');

          if (diff > 31) {
            diff = moment(new Date()).diff(timestamp, 'months');

            if (diff > 12) {
              diff = moment(new Date()).diff(timestamp, 'years');
              value = diff + 'y';
            } else {
              value = diff + 'mo';
            }
          } else {
            value = diff + 'd';
          }
        } else {
          value = diff + 'h';
        }
      } else {
        value = diff + 'm';
      }
    } else {
      value = diff + 's';
    }

    return value;
  }

}
