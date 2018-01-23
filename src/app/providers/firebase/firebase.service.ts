import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseService {

  firebaseInstance;
  firebaseAuth;

  constructor(private _router: Router) {
    this.initializeFirebase();
  }

  initializeFirebase() {
    // Configuration parameters
    let config = {
      apiKey: "AIzaSyA3A60PNVTjLDhXNpVKDhjntcp7KSsWAp4",
      authDomain: "forum-app-challenge.firebaseapp.com",
      databaseURL: "https://forum-app-challenge.firebaseio.com",
      storageBucket: "forum-app-challenge.appspot.com",
      messagingSenderId: "937135036055"
    };

    // Initializing connection with firebase
    this.firebaseInstance = firebase;
    this.firebaseInstance.initializeApp(config);
    this.firebaseAuth = this.firebaseInstance.auth();

    // Activating listener for user logged by email and password
    this.onAuthStateChanged();
  }

  authenticateWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider);
  }

  authenticateWithEmailAndPassword(email, password) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  }

  onAuthStateChanged() {
    this.firebaseAuth
      .onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._router.navigate(['/']);
        }
      });
  }

  signOut() {
    localStorage.clear();
    this.firebaseAuth.signOut();
  }
}
