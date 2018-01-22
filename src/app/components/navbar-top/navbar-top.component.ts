import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
  username;

  constructor(private _router: Router) { }

  ngOnInit() {
    let user = localStorage.getItem('user')
                 ? JSON.parse(localStorage.getItem('user'))
                 : localStorage.getItem('user');

    this.username = user.displayName;
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
