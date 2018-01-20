import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {
  }
  
  canActivate() {
    // TODO: implement an auth service
    let userExists = !!localStorage.getItem('user');
  
    if (userExists) {
      return true;
    }
  
    this._router.navigate(['/login']);
    return false;
  }
}
