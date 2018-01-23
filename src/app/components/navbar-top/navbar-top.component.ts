import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase/firebase.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
  username;

  constructor(
    private _router: Router,
    private _firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    let user = localStorage.getItem('user')
                 ? JSON.parse(localStorage.getItem('user'))
                 : localStorage.getItem('user');

    this.username = user.displayName || user.email;
  }

  logout() {
    this._firebaseService.signOut();
    this._router.navigate(['/login']);
  }
}
