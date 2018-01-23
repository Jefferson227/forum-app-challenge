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

      this.discussions = Object.keys(firebaseObj).map(item => {
        let _item = firebaseObj[item];
        _item.timestamp = this.transformDate(_item.timestamp);

        return _item;
      });
      console.log(this.discussions);
    });
  }

  ngOnInit() {
  }

  transformDate(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
  }

}
