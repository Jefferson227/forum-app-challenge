import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.component.html',
  styleUrls: ['./new-discussion.component.scss']
})
export class NewDiscussionComponent implements OnInit {

  title;
  message;

  constructor(
    private _firebase: FirebaseService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  createNewDiscussion() {
    const user = JSON.parse(localStorage.getItem('user'));
    const discussionObj = {
      title: this.title,
      message: this.message,
      timestamp: new Date().getTime(),
      user: user.displayName || user.email
    };

    this._firebase.createNewDiscussion(discussionObj);
    this._router.navigate(['/']);
  }

}
