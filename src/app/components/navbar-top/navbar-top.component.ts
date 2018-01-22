import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
  username;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    // TODO: implement a better solution than this, with no workarounds
    this._route.url.subscribe((url) => {
      let user = localStorage.getItem('user')
                   ? JSON.parse(localStorage.getItem('user'))
                   : localStorage.getItem('user');

      this.username = user.displayName;
    });
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
