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

  authenticateWithGoogle() {
    this._firebaseService
      .authenticateWithGoogle()
      .then((result: any) => {
        var token = result.credential.accessToken;
        var user = result.user;

        localStorage.setItem('user', JSON.stringify(user));

        // TODO: remove this workaround to work correctly with Angular Routing
        window.location.href = '/';

        // The code below should work but not
        // this._router.navigate(['/categories']);
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

}
