import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';

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
      // console.log(snap.val());
      const firebaseObj = snap.val();
      this.discussions = Object.keys(firebaseObj).map(item => firebaseObj[item]);
      console.log(this.discussions);
    });
  }

  ngOnInit() {
  }

}
