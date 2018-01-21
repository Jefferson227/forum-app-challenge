import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  authenticate() {
    this._firebaseService
      .authenticate()
      .then((result: any) => {
        var token = result.credential.accessToken;
        var user = result.user;

        localStorage.setItem('user', JSON.stringify(user));
        this._router.navigate(['/categories']);
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

}
