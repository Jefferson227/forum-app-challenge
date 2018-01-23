import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  createNewDiscussion() {
    this._firebaseService.createNewDiscussion();
  }
}
