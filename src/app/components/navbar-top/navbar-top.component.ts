import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
